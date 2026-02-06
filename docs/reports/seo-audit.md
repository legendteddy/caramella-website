# SEO Audit Snapshot (2026-02-06)

This document is a quick snapshot of SEO hygiene at the time noted above. Treat it as guidance, not a guarantee.

## What Looks Solid

- `robots.txt` allows crawling and includes a sitemap pointer.
- `sitemap.xml` lists the core pages and uses recent `lastmod` values.
- Pages include JSON-LD (Schema.org), Open Graph, and standard meta tags.
- Responsive viewport meta is present on the primary pages.

## Things To Keep Watching

- Content accuracy: schema fields (address, phone, hours) must match reality.
- Canonicals: keep one canonical URL per page and ensure it matches the live path (prefer explicit `.html` paths on GitHub Pages).
- Gallery accessibility: ensure generated images always have meaningful `alt` text.
- Performance: large images and heavy effects can drag mobile Core Web Vitals.

## Suggested Next Checks

- Validate JSON-LD with Google's Rich Results Test (Home/FAQ/Article schemas).
- Run Lighthouse (Mobile) and verify no layout shift in hero and cards.
- Confirm `sitemap.xml` `lastmod` updates when you ship content changes.
- Confirm `get-a-quote.html` stays `noindex` and redirects to `contact-us.html` (avoid multiple form endpoints).
