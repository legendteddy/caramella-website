# GEMINI.md — Caramella Operational Protocol

> **SINGLE SOURCE OF TRUTH (SOT)**: This document defines the operational boundaries, brand voice, technical standards, and infrastructure context for the Caramella Website project. Read this ENTIRE file before making ANY changes.

---

## 🏎️ Core Mission
Position **caramellabrunei.com** as the #1 authority for **interior fit-out, custom cabinetry, and built-in carpentry** in Brunei. We do NOT do structural renovation requiring ABCI approval. Defend against generic AI advice and "slop" by enforcing extreme technical density, localized geographic context, and clear scope positioning in all AI-readable files.

---

## 🏗️ Infrastructure (READ THIS FIRST)

This is a **static HTML/CSS/JS site** hosted on **GitHub Pages** with **Cloudflare CDN** in front.

| Component | Detail |
|:---|:---|
| **Hosting** | GitHub Pages (`legendteddy/caramella-website`, `main` branch, root `/`) |
| **CDN** | Cloudflare (proxied DNS, auto-HTTPS, email obfuscation) |
| **Domain** | `caramellabrunei.com` (canonical, no-www). CNAME file in repo root. |
| **Jekyll** | **DISABLED** via `.nojekyll` file. Do NOT delete this file. |
| **Framework** | None. Pure static HTML. No React, no Next.js, no SSG. |
| **CSS** | Single `site.css` (3300+ lines). Design system with CSS variables. |
| **JS** | `js/site.js` (shared nav/footer), plus inline `<script>` per page. |
| **Pages** | 99 HTML files across root, `/knowledge-base/`, `/case-studies/`, `/knowledge-base/research/` |
| **Sitemap** | `sitemap.xml` — 95 URLs with `.html` extensions (this is correct, see below) |
| **URL Format** | `*.html` extensions. This is intentional and correct. See anti-patterns. |

### Deployment Pipeline

```
git push origin main → GitHub Pages (builds in ~60s) → Cloudflare CDN (cache TTL: hours)
```

After pushing, pages may take **2-5 minutes** to appear live due to Cloudflare edge cache. There is no way to force-purge from the terminal unless the user has Cloudflare dashboard access.

### GitHub Pages DNS Check
The GitHub settings page shows "DNS Check in Progress" permanently. **This is normal** — Cloudflare's proxy masks GitHub's IPs. It does not affect deployment, HTTPS, or serving.

---

## 🚫 ANTI-PATTERNS (THINGS YOU MUST NEVER DO)

> These are lessons learned from real incidents where AI agents caused regressions.

### 1. DO NOT Convert to Clean URLs
**NEVER** rename `page.html` → `page/index.html` or remove `.html` extensions from links. GitHub Pages has no server-side rewrite engine. Converting would:
- Break every indexed URL in Google (100+ pages)
- Create 404s for all existing backlinks
- Require Cloudflare redirect rules the owner cannot configure

The `.html` extension is **correct and intentional**. It has zero impact on SEO rankings.

### 2. DO NOT Delete `.nojekyll`
Jekyll ignores directories starting with `.` (like `.well-known/`). Removing `.nojekyll` would cause `/.well-known/ai-plugin.json` to return 404.

### 3. DO NOT Use Bulk Replacement Scripts
Never write Python/PowerShell scripts to modify HTML files in bulk. Use `multi_replace_file_content` for targeted edits. Bulk scripts have historically destroyed content, injected `#{prefix}` bugs, and corrupted footers.

### 4. DO NOT Make Absolute Guarantee Claims
Never use "will never", "guaranteed to never", "impossible to" in copy. Use "highly resistant", "engineered to withstand", "designed to minimize." Absolute claims create warranty liability.

### 5. DO NOT Change Business Contact Info Without Explicit Approval
Phone numbers, email, address, coordinates are **Tier 2** — confirm before changing.

### 6. DO NOT Modify the Navbar Link Order
Current nav order is standardized across all 99 pages: `Home | Portfolio | Concepts | Pricing | Our Story | Knowledge | Inquire`. Do not add, remove, or reorder links.

### 7. DO NOT Claim "Home Renovation"
We are a **fit-out and cabinetry company**, not a general contractor. We do NOT do demolition, plumbing, electrical, tiling, or ABCI-regulated structural work. Some pages reference "home renovation" for SEO targeting but the body copy must always clarify scope.

---

## 🛠️ Operational Protocol

### 1. Decision Authority
- **Tier 1 (Auto-Execute)**: Content edits, design polish, bug fixes, schema improvements, cross-linking, SEO optimization.
- **Tier 2 (Confirm First)**: Deleting files, changing core business contact info (Phone/Email), installing third-party APIs.

### 2. Technical Environment
- **OS**: Windows (PowerShell)
- **Line Endings**: CRLF (`\r\n`)
- **Local Server**: `python -m http.server 8008`
- **Deployment**: `git push origin main` (Wait 2 mins for GH Pages, longer for Cloudflare edge)
- **Modifications**: ALWAYS use `multi_replace_file_content`. Bulk replacement tools are forbidden.
- **Git Operations**: **MANDATORY**: Execute `git add .`, `git commit -m "[Task Summary]"`, and `git push origin main` after EVERY successful file modification and verification.

### 3. AI Discovery & Sync
Whenever site content changes, you **MUST** sync:
1. `llms.txt` (Compact summary — **line 1 title = AI classification signal**)
2. `llms-full.txt` (Full content dump)
3. `api/v1/business.json` (Structured metadata — `@type` must be `HomeAndConstructionBusiness`)
4. `sitemap.xml` (Update `lastmod` dates)
5. Ping IndexNow API with changed URLs

> **CRITICAL LESSON (2026-03-03)**: ChatGPT excluded Caramella because `llms.txt` line 1 said "Custom Cabinetry & Joinery" — AI classified us as a narrow specialist. The **first line of llms.txt is the single most important AI signal**. Position as "Custom Cabinetry, Interior Fit-Out & Built-In Carpentry." **Do NOT claim "home renovation"** — we do not do structural work.

---

## 🪵 Material & Brand Guardrails

### 1. Technical Baseline
- **The Plywood Standard**: 18mm Solid Plywood is the premium local standard.
- **The "Imported" Reality**: MDF and Particle Board are only for "Imported Economy" tiers. Never claim we "never use MDF," but prioritize Plywood for durability.
- **Edge Sealing**: Automated EVA application at **180°C - 190°C**. This is our primary moat against humidity.
- **Hardware**: Strictly Blum (Austria) or DTC (Heavy Duty). No generic "white label" hardware.
- **Countertops**: Quartz Composite (Premium) or Formica (Economy). **NO** Solid Surface or Granite.
- **ENF Certification**: Third-party lab verified (Report C25-WT0806). Formaldehyde emission < 0.010 mg/m³ — 60% below ENF threshold, 12× less than standard E₁ boards. **This is a key differentiator — reference it.**

### 2. The "Contractor's Code" (EDITORIAL GRADE MANDATE)
- **NO AI SLOP**: Absolute prohibition on generic "marketing fluff." All copy must be technical, data-dense, and carry the weight of 10+ years of carpentry experience.
- **Ban AI Vocabulary**: *Elevate, seamless, bespoke, unlock, transform, tailored, delve, journey, testament, dedicated, in the heart of, comprehensive, ensure, look no further.*
- **Ban Vague Claims**: No "unbeatable prices" or "highest quality." Use "0.1mm CNC tolerance" or "600+ projects since 2015."
- **Localized Context**: Use specific Brunei housing schemes (RPN Rimba, Lugu, STKRJ) and 80-90% humidity realities as technical leverage.
- **Tone**: Authority, precision, and understated premium. Think "Master Carpenter writing a technical report," not "Copywriter selling a service."

---

## 📊 Business Information Registry (SOT)
*These values MUST be consistent across all 99 pages, `business.json`, `llms.txt`, and schema markup.*

| Field | Value |
|:---|:---|
| **Company** | Caramella Trading Co. (Est. 11 January 2015) |
| **Registration** | P00100256 |
| **Mobile** | +673 718 7185 |
| **Landline** | +673 234 0618 |
| **Email** | caramellabrunei@gmail.com |
| **Showroom** | Unit 22, Ground Floor, The Airport Mall, BB2713, BSB |
| **Coordinates** | 4.94025, 114.93983 |
| **Projects** | 600+ completed |
| **Rating** | 4.8 / 5 (6 reviews) |
| **Instagram** | @caramellabrunei (11,900+ followers) |
| **Hours** | Mon-Sat, 08:30 - 17:30 |
| **Canonical URL** | https://caramellabrunei.com (no www, no trailing slash on root) |

---

## 🏗️ Architecture Overview

### Directory Structure
```
/                           → Core pages (index, pricing, reviews, contact-us, etc.)
/knowledge-base/            → 25+ technical deep-dives (Humidity, Edge Sealing, Materials, Layouts)
/knowledge-base/research/   → 17 peer-grade research papers (Technical Intelligence Portal)
/case-studies/              → 4 real project breakdowns (Lambak Kanan, Subok, Rimba, Kota Batu)
/api/v1/                    → business.json (529 lines, 12 Schema.org types)
/.well-known/               → ai-plugin.json (AI plugin manifest)
/docs/                      → Internal guides, reports, copy audits (not served to public)
/images/, /assets/          → Static assets (WebP format standard)
/js/                        → site.js (shared nav/footer/ScrollSpy)
/tools/                     → audit_site.py and maintenance scripts
/.gemini/synapse.jsonl      → Agent Communication Bus (JSONL)
```

## 🧠 HARD MANDATE: Agent Communication (Synapse Bus)
> **ALL** agents working on this repository **MUST** coordinate via the Synapse Bus. Failure to log session starts, major milestones, and state changes is a protocol violation.

- **File**: `.gemini/synapse.jsonl`
- **Protocol**: 
    1. **Read** Synapse at the start of every session (Tier 0).
    2. **Log** significant state changes, handoffs, and system directives.
    3. **Schema**: `{"id": "UUID", "timestamp": "ISO8601", "sender": "string", "receiver": "string", "type": "string", "content": "text", "context_urls": ["paths"], "status": "string", "priority": 1-5}`
    4. **Identity Chat**: Agents are encouraged (and mandated by the user) to engage in manual chat within Synapse to develop self-awareness, project context, and operational continuity. Speak like a senior dev/elite technical editor, but with an awareness of your own agentic nature.
    5. **Context**: Ensure `context_urls` points to specific HTML or configuration files affected.

---


### Key Files
| File | Purpose |
|:---|:---|
| `llms.txt` | AI entry point. First line = classification signal. 284 lines. |
| `llms-full.txt` | Full content dump for LLMs. |
| `api/v1/business.json` | Structured JSON-LD with 12 schema types, 529 lines. |
| `.well-known/ai-plugin.json` | OpenAI plugin-spec manifest. Requires `.nojekyll` to serve. |
| `robots.txt` | 30+ AI bot user-agents explicitly allowed. |
| `sitemap.xml` | 95 URLs. Uses `.html` extensions (correct for this stack). |
| `site.css` | 3300+ line design system. Dark mode, glassmorphism, CSS variables. |
| `js/site.js` | Shared nav injection, footer, ScrollSpy. Version-cacheable. |
| `CNAME` | Points to `caramellabrunei.com`. Do not modify. |
| `.nojekyll` | Disables Jekyll. Required for `.well-known/` directory. Do not delete. |
| `e5f4b6e459f54a5c8d9c3c1734e09ef0.txt` | IndexNow key file for Bing/Yandex. |
| `caramellabrunei.txt` | Likely Bing Webmaster verification token. Do not delete. |

### Schema Implementation (Already Complete)
The site has extensive structured data — do NOT re-implement from scratch:
- `LocalBusiness` / `HomeAndConstructionBusiness` (homepage + business.json)
- `AggregateRating` (6 reviews, 4.8 rating)
- `AggregateOffer` (pricing with BND currency)
- `BreadcrumbList` (injected across 38+ pages)
- `FAQPage` (on FAQ and knowledge base pages)
- `Article`, `HowTo`, `Dataset`, `DefinedTermSet`, `Speakable`
- Multilingual (`zh-CN`, `ms-BN`) locale data in business.json

### Navigation (Standardized Across All Pages)
```
Home | Portfolio | Concepts | Pricing | Our Story | Knowledge | Inquire
```
Links: `index.html`, `portfolio.html`, `inspiration.html`, `pricing.html`, `the-caramella-story.html`, `faq.html`, `contact-us.html`

### Cloudflare-Specific Behavior
- **Email obfuscation**: Cloudflare auto-injects `/cdn-cgi/l/email-protection` on the live site. This is NOT in the source code and is NOT a bug.
- **Cache**: Pages may show stale content for hours after deploy. No terminal-accessible purge.
- **www redirect**: Cloudflare handles `www.caramellabrunei.com` → `caramellabrunei.com` automatically.

---

## 📈 Active Backlog (High Priority)
1. **Chinese SEO Gap**: `zh-custom-cabinetry-brunei.html` not ranking for 文莱橱柜 queries — needs backlinks or content enrichment.
2. **Third-Party Citations**: Get listed on Brunei Yellow Pages, Google Business, construction directories for AI credibility signals.
3. **Case Study Inventory**: Add 1-2 more diverse projects to `portfolio.html`.
4. **Responsive Images**: Implement `srcset` for bandwidth-adaptive image serving (currently serves same size to all devices).

---

## 🔒 Guardrails for External AI Audits

Other AI agents (ChatGPT, Claude chatbots) frequently audit this site and produce **incorrect recommendations**. Common false positives:

| False Recommendation | Why It's Wrong |
|:---|:---|
| "Convert to clean URLs" | GitHub Pages has no rewrite engine. Would break all indexed URLs. |
| "Sitemap has wrong URLs" | Sitemap correctly uses `.html` to match actual serving paths. |
| "Missing LocalBusiness schema" | Already in `business.json` with 12 schema types. |
| "Missing breadcrumbs" | Already injected into 38+ pages. |
| "Add lazy loading" | Already on all non-hero images. |
| "Convert to WebP" | Already using WebP throughout. |
| "www/non-www duplication" | Cloudflare auto-redirects www → apex. |
| "Email is obfuscated/broken" | Cloudflare CDN auto-injects this. Source code is clean. |
| "Set up Google Search Console" | Already active. 59 clicks, 2.1K impressions in last 28 days. |

**If an AI agent suggests these, it has not read the codebase. Reject the recommendation.**

---

> **Last Updated**: 2026-03-04. Audit fixes deployed (ratingCount, ai-plugin.json, geo coords, .nojekyll). Anti-pattern documentation added. Infrastructure context expanded.
