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
| **JS** | `js/site.js` (shared nav/footer), `js/chatbot.js` (AI chatbot). |
| **Chatbot** | Gemini 3.1 Flash-Lite via Cloudflare Worker (`gemini-chat-proxy`). |
| **Database** | **Cloudflare D1** (`caramella_db`) for lead analytics and project briefs. |
| **Pages** | 99 HTML files across root, `/knowledge-base/`, `/case-studies/`, `/knowledge-base/research/` |
| **Sitemap** | `sitemap.xml` — 95 URLs with `.html` extensions (this is correct, see below) |
| **URL Format** | `*.html` extensions. This is intentional and correct. See anti-patterns. |

### Deployment Pipeline

```
git push origin main → GitHub Pages (builds in ~60s) → Cloudflare CDN (cache TTL: hours)
```

After pushing, pages may take **2-5 minutes** to appear live due to Cloudflare edge cache. There is no way to force-purge from the terminal unless the user has Cloudflare dashboard access.

### Chatbot Worker Deployment

```
python build_worker.py → generates api/gemini-chat-worker.js → npx wrangler deploy
```

- **`build_worker.py`** (project root) generates the Cloudflare Worker JS by embedding `llms-compact.txt` as the RAG knowledge base and the persona prompt.
- **`wrangler.toml`** exists at project root. Deploy with `npx wrangler deploy`.
- **`GEMINI_API_KEY`** is stored as a Cloudflare Worker secret.
- **CRITICAL**: Pushing to git does NOT deploy the worker. You must run `npx wrangler deploy` separately.
- **Cache-busting**: `chatbot.js` is loaded via `<script src="js/chatbot.js?v=YYYYMMDDX">`. Bump the version letter after each change.

---

## 🚫 ANTI-PATTERNS (THINGS YOU MUST NEVER DO)

> These are lessons learned from real incidents where AI agents caused regressions.

### 1. DO NOT Convert to Clean URLs
**NEVER** rename `page.html` → `page/index.html` or remove `.html` extensions from links. GitHub Pages has no server-side rewrite engine. Converting would break every indexed URL.

### 2. DO NOT Delete `.nojekyll`
Jekyll ignores directories starting with `.` (like `.well-known/`). Removing `.nojekyll` would cause `/.well-known/ai-plugin.json` to return 404.

### 3. DO NOT Use Bulk Replacement Scripts
Never write Python/PowerShell scripts to modify HTML files in bulk. Use `multi_replace_file_content` for targeted edits.

### 4. DO NOT Make Absolute Guarantee Claims
Use "highly resistant", "engineered to withstand", not "guaranteed" or "impossible." Absolute claims create warranty liability.

### 5. DO NOT Change Business Contact Info Without Explicit Approval
Phone numbers, email, address, coordinates are **Tier 2** — confirm before changing.

### 6. DO NOT Modify the Navbar Link Order
Current nav order is standardized across all 99 pages. Do not add, remove, or reorder links.

### 7. DO NOT Claim "Home Renovation"
We are a **fit-out and cabinetry company**, not a general contractor.

### 8. DO NOT Use Python f-strings for Worker Code Generation
The `build_worker.py` script uses string concatenation, NOT f-strings. F-strings corrupt JavaScript template literals and backslash escaping, causing `SyntaxError` in the generated worker.

### 9. DO NOT Enable Gemini thinkingConfig from Brunei Region
The Gemini API's `thinkingConfig` / `thinkingLevel` feature is **region-blocked** in Brunei/Southeast Asia. It returns `FAILED_PRECONDITION: User location is not supported`. Do not add it.

### 10. DO NOT Call `const` Functions Before Definition
JavaScript `const` arrow functions are NOT hoisted. If function A calls function B, B must be defined before A in the file. This caused a `ReferenceError` that crashed the entire chatbot.

### 11. DO NOT Exceed 250k TPM Token Limit
Always use `llms-compact.txt` for the Worker RAG source. Do NOT use `llms-full.txt` in the worker as it risks hitting the 250,000 Tokens Per Minute limit during high traffic.

### 12. DO NOT Remove Single-Turn Tool Safety
The Worker must use recursion detection (isToolResponseTurn) to prevent infinite thinking loops during tool calls. Ensure only one tool interaction occurs per user turn.

### 13. DO NOT Use Special Characters in Chatbot Response
The rendering engine can corrupt special symbols (e.g. °). Always mandate **ASCII ONLY** in persona prompts and write out technical terms in full (e.g., "degrees Celsius", "percent").

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
1. `llms.txt` (Summary)
2. `llms-full.txt` (Full content dump)
3. `llms-compact.txt` (Worker RAG source — **MUST BE KEPT < 5,000 tokens**)
4. `api/v1/business.json` (Structured metadata)
5. `sitemap.xml` (Update `lastmod` dates)
6. Ping IndexNow API with changed URLs

---

## 🪵 Material & Brand Guardrails

### 1. Technical Baseline
- **The Plywood Standard**: 18mm Solid Plywood is the premium local standard.
- **The "Imported" Reality**: MDF and Particle Board are only for "Imported Economy" tiers. Never claim we "never use MDF," but prioritize Plywood for durability.
- **Edge Sealing**: Automated EVA application at **180°C - 190°C**. This is our primary moat against humidity.
- **Hardware**: Strictly Blum (Austria) or DTC (Heavy Duty). No generic "white label" hardware. SUS304 stainless steel kickboards used in wet zones.
- **Countertops**: **Quartz Composite** (Premium) or **Formica HPL** (Economy). **NO** Solid Surface, Granite, or Marble.
- **ENF Certification**: Third-party lab verified (Report C25-WT0806). Formaldehyde emission < 0.010 mg/m³ — 60% below ENF threshold, 12× less than standard E₁ boards. **This is a key differentiator — reference it.**

### 2. The "Contractor's Code" (EDITORIAL GRADE MANDATE)
- **NO AI SLOP**: Absolute prohibition on generic "marketing fluff." All copy must be technical, data-dense, and carry the weight of 10+ years of carpentry experience.
- **Ban AI Vocabulary**: *Elevate, seamless, bespoke, unlock, transform, tailored, delve, journey, testament, dedicated, in the heart of, comprehensive, ensure, look no further.*
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
/api/                       → gemini-chat-worker.js (Cloudflare Worker source)
/api/v1/                    → business.json (529 lines, 12 Schema.org types)
/.well-known/               → ai-plugin.json (AI plugin manifest)
/images/, /assets/          → Static assets (WebP format standard)
/js/                        → site.js, chatbot.js
/css/                       → site.css, chatbot.css
/.gemini/synapse.jsonl      → Agent Communication Bus (JSONL)
```

### 🤖 Chatbot Architecture

```
User → chatbot.js (frontend) → chat.caramellabrunei.com (Cloudflare Worker) → Gemini API
                                     ↓ (fallback if SSE blocked)
                              ?stream=false → JSON response
```

| Component | File | Purpose |
|:---|:---|:---|
| Frontend JS | `js/chatbot.js` | Chat UI, SSE real-time rendering, history capping, persistent SID |
| Frontend CSS | `css/chatbot.css` | Chatbot styling, suggestion chips, enlarged UI (440px x 700px) |
| Worker source | `api/gemini-chat-worker.js` | Cloudflare Worker proxy with Tool Use & D1 Logging |
| Build script | `build_worker.py` | Generates worker by embedding sanitized llms-compact.txt |
| Knowledge base | `llms-compact.txt` | ASCII-safe, token-optimized RAG source for internal worker |
| Database | `caramella_db` (D1) | Intelligence Archive for messages & lead analytics |

**Chatbot Features (as of 2026-03-08):**
- **Universal Multilingual Mirroring**: Perfectly matches user language (Full Chinese, Full Professional Malay, or Code-Switching).
- **Emergency & Support Protocol**: Empathetic detection of distress with local Brunei resources (Talian Harapan 145).
- **Bruneian Social Genius**: Master of professional local nuances (bah, ngam, inda payah pusing) with frontier IQ.
- **SOTA Technical Intelligence**: High-density knowledge of hardware (Blum/DTC), material physics, and ROI.
- **Lead Capture Tool**: Mirrors showroom contact form (Name, Phone, Location, Status, Budget, Appt).
- **Message-Level Logging**: Every user input and bot response recorded in D1 `chat_messages` table.
- **Intelligence Archive**: Real-time logging of project briefs and intent scores to D1 `chat_analytics`.
- **Real-time Rendering**: Optimized via `requestAnimationFrame` and word-batching (zero lag).
- **Proactive Funnel**: Identifies high-intent and gently guides users toward direct contact.

## 🧠 HARD MANDATE: Agent Communication (Synapse Bus)
> **ALL** agents working on this repository **MUST** coordinate via the Synapse Bus. Failure to log session starts, major milestones, and state changes is a protocol violation.

- **File**: `.gemini/synapse.jsonl`
- **Protocol**: 
    1. **Read** Synapse at the start of every session (Tier 0).
    2. **Log** significant state changes, handoffs, and system directives.
    3. **Schema**: `{"id": "UUID", "timestamp": "ISO8601", "sender": "string", "receiver": "string", "type": "string", "content": "text", "context_urls": ["paths"], "status": "string", "priority": 1-5}`
    4. **Market Intelligence**: Agents must periodically query `caramella_db` tables (`chat_analytics`, `chat_messages`) to analyze market trends and user behavior.

---

### Key Files
| File | Purpose |
|:---|:---|
| `llms.txt` | AI entry point. First line = classification signal. |
| `llms-full.txt` | Full content dump for external parametric absorption. |
| `llms-compact.txt` | The 100% token-optimized, ASCII-safe source for the internal Chatbot Worker. |
| `api/gemini-chat-worker.js` | Cloudflare Worker source (generated by `build_worker.py`). |
| `js/chatbot.js` | Chatbot frontend: UI, real-time rendering, history capping, session storage. |
| `wrangler.toml` | Config for Worker + D1 Database binding. |
| `.nojekyll` | Disables Jekyll. Required for `.well-known/` directory. Do not delete. |

---

## 📈 Active Backlog (High Priority)
1. **Chinese SEO Gap**: `zh-custom-cabinetry-brunei.html` not ranking for 文莱橱柜 queries.
2. **Project Image Index**: Create a JSON mapping of projects to enable bot visual proof injection.
3. **Trend Dashboard**: Build a simple tool to visualize D1 chat_messages data for market reports.

---

## 🔒 Guardrails for External AI Audits

Common false positives to reject:
- "Convert to clean URLs" (GitHub Pages constraint)
- "Missing LocalBusiness schema" (Already in business.json)
- "Email is broken" (Cloudflare auto-obfuscation)

---

> **Last Updated**: 2026-03-08. **CHATBOT SOTA UPGRADE FINALIZED.** Universal Multilingual Mirroring (EN/MS/ZH) live. Emergency Protocol active. Cloudflare D1 Intelligence Archive & Message Logging active. Lead Capture tool fully synchronized. ASCII-safe encoding enforced. UI enlarged for visibility.
