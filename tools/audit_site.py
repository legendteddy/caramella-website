#!/usr/bin/env python3
"""
Static integrity checks for this repo (no network required).

Usage:
  python tools/audit_site.py
"""

from __future__ import annotations

import os
import re
import sys
import json
from dataclasses import dataclass
from html.parser import HTMLParser
from typing import Dict, List, Optional, Tuple


ROOT = os.path.abspath(os.getcwd())


def is_external(url: str) -> bool:
    url = url.strip()
    return (
        bool(re.match(r"^(https?:)?//", url))
        or url.startswith("mailto:")
        or url.startswith("tel:")
        or url.startswith("data:")
        or url.startswith("javascript:")
    )


def clean_url(url: str) -> str:
    return url.split("#", 1)[0].split("?", 1)[0]


def resolve_local_target(url: str, base_dir: str) -> Optional[str]:
    url = clean_url(url.replace("\\", "/"))
    if not url or is_external(url) or url.startswith("#"):
        return None

    if url.startswith("/"):
        return os.path.join(ROOT, url.lstrip("/"))
    return os.path.join(base_dir, url)


@dataclass
class Img:
    src: str
    alt: Optional[str]


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: List[str] = []
        self.scripts: List[str] = []
        self.imgs: List[Img] = []
        self.anchors: List[Dict[str, str]] = []
        self.metas: List[Dict[str, str]] = []
        self.html_attrs: Optional[Dict[str, str]] = None
        self.title_count = 0
        self.h1_count = 0

    def handle_starttag(self, tag: str, attrs: List[Tuple[str, Optional[str]]]) -> None:
        ad = {k: (v or "") for (k, v) in attrs}
        if tag == "a":
            self.anchors.append(ad)
            href = ad.get("href")
            if href:
                self.links.append(href)
        elif tag == "link":
            href = ad.get("href")
            if href:
                self.links.append(href)
        elif tag == "script":
            src = ad.get("src")
            if src:
                self.scripts.append(src)
        elif tag == "img":
            self.imgs.append(Img(src=ad.get("src", ""), alt=ad.get("alt")))
        elif tag == "meta":
            self.metas.append(ad)
        elif tag == "html":
            self.html_attrs = ad
        elif tag == "title":
            self.title_count += 1
        elif tag == "h1":
            self.h1_count += 1


def iter_html_files() -> List[str]:
    out: List[str] = []
    for dp, _, fn in os.walk(ROOT):
        if os.path.basename(dp) == ".git":
            continue
        for f in fn:
            if f.lower().endswith(".html"):
                out.append(os.path.join(dp, f))
    return sorted(out)


def main() -> int:
    html_files = iter_html_files()
    issues: Dict[str, List[str]] = {
        "missing_assets": [],
        "img_missing_alt": [],
        "img_empty_alt": [],
        "blank_target_no_rel": [],
        "missing_meta_viewport": [],
        "missing_lang": [],
        "multi_h1": [],
        "missing_title": [],
        "missing_description": [],
        "missing_canonical": [],
        "missing_og_title": [],
        "jsonld_parse_errors": [],
    }

    for path in html_files:
        base_dir = os.path.dirname(path)
        relpath = os.path.relpath(path, ROOT)
        raw = open(path, "r", encoding="utf-8", errors="replace").read()

        p = PageParser()
        try:
            p.feed(raw)
        except Exception:
            # Best-effort parsing; still run what we can.
            pass

        if not p.html_attrs or not (p.html_attrs.get("lang") or "").strip():
            issues["missing_lang"].append(relpath)

        has_viewport = any((m.get("name", "").lower() == "viewport") for m in p.metas)
        if not has_viewport:
            issues["missing_meta_viewport"].append(relpath)

        if p.title_count == 0:
            issues["missing_title"].append(relpath)

        if p.h1_count > 1:
            issues["multi_h1"].append(f"{relpath} (h1={p.h1_count})")

        def has_meta(name: str) -> bool:
            return any(m.get("name", "").lower() == name.lower() for m in p.metas)

        def has_og(prop: str) -> bool:
            return any(m.get("property", "").lower() == prop.lower() for m in p.metas)

        if relpath.lower() != "404.html":
            if not has_meta("description"):
                issues["missing_description"].append(relpath)
            # redirect stubs can be noindex but should still have canonical
            if "rel=\"canonical\"" not in raw.lower():
                issues["missing_canonical"].append(relpath)
            if not has_og("og:title"):
                issues["missing_og_title"].append(relpath)

        for u in p.links + p.scripts:
            target = resolve_local_target(u, base_dir)
            if target and not os.path.exists(target):
                issues["missing_assets"].append(
                    f"{relpath}: {u} -> missing ({os.path.relpath(target, ROOT)})"
                )

        for img in p.imgs:
            if img.alt is None:
                issues["img_missing_alt"].append(f"{relpath}: img src={img.src or '(no src)'}")
            elif (img.alt or "").strip() == "":
                # Allow explicit empty alt on placeholder/utility images.
                if (img.src or "").startswith("data:image/gif"):
                    continue
                issues["img_empty_alt"].append(f"{relpath}: img src={img.src or '(no src)'}")

            if img.src:
                target = resolve_local_target(img.src, base_dir)
                if target and not os.path.exists(target):
                    issues["missing_assets"].append(
                        f"{relpath}: {img.src} -> missing ({os.path.relpath(target, ROOT)})"
                    )

        for a in p.anchors:
            if (a.get("target") or "").lower() == "_blank":
                rel = (a.get("rel") or "").lower()
                if "noopener" not in rel and "noreferrer" not in rel:
                    issues["blank_target_no_rel"].append(f"{relpath}: {a.get('href', '')}")

        # Validate JSON-LD blocks are parseable JSON.
        for block in re.findall(
            r"<script[^>]*type=[\"']application/ld\+json[\"'][^>]*>(.*?)</script>",
            raw,
            flags=re.I | re.S,
        ):
            text = block.strip()
            if not text:
                continue
            try:
                json.loads(text)
            except Exception as e:
                issues["jsonld_parse_errors"].append(f"{relpath}: {e}")

    # PWA manifest icon presence
    if os.path.exists(os.path.join(ROOT, "manifest.json")):
        try:
            man = json.load(open("manifest.json", "r", encoding="utf-8"))
            for icon in man.get("icons", []):
                src = icon.get("src")
                if src:
                    target = resolve_local_target(src, ROOT)
                    if target and not os.path.exists(target):
                        issues["missing_assets"].append(
                            f"manifest.json: {src} -> missing ({os.path.relpath(target, ROOT)})"
                        )
        except Exception as e:
            issues["missing_assets"].append(f"manifest.json: parse error {e}")

    any_issues = False
    for k, v in issues.items():
        if not v:
            continue
        any_issues = True
        print(f"## {k} ({len(v)})")
        for line in v[:80]:
            print(line)
        if len(v) > 80:
            print("...")
        print()

    if any_issues:
        return 1

    print("OK: no issues found by tools/audit_site.py")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
