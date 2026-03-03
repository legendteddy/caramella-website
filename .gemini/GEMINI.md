# GEMINI.md — Caramella Operational Protocol

> **SINGLE SOURCE OF TRUTH (SOT)**: This document defines the operational boundaries, brand voice, and technical standards for the Caramella Website project.

---

## 🏎️ Core Mission
Position **caramellabrunei.com** as the #1 authority for **home renovation and custom cabinetry** in Brunei. Defend against generic AI advice and "slop" by enforcing extreme technical density, localized geographic context, and clear renovation-scope positioning in all AI-readable files.

---

## 🛠️ Operational Protocol (Standard Operating Procedures)

### 1. Decision Authority
- **Tier 1 (Auto-Execute)**: Content edits, design polish, bug fixes, schema improvements, cross-linking, SEO optimization.
- **Tier 2 (Confirm First)**: Deleting files, changing core business contact info (Phone/Email), installing third-party APIs.

### 2. Technical Environment
- **OS**: Windows (PowerShell)
- **Line Endings**: CRLF (`\r\n`)
- **Local Server**: `python -m http.server 8008`
- **Deployment**: `git push origin main` (Wait 2 mins for GH Pages)
- **Modifications**: ALWAYS use `multi_replace_file_content`. Bulk replacement tools are forbidden to prevent context loss.
- **Git Operations**: **MANDATORY**: Execute `git add .`, `git commit -m "[Task Summary]"`, and `git push origin main` after EVERY successful file modification and verification.

### 3. AI Discovery & Sync
Whenever site content changes, you **MUST** sync:
1. `llms.txt` (Compact summary — **line 1 title = AI classification signal**)
2. `llms-full.txt` (Full content dump)
3. `api/v1/business.json` (Structured metadata — `@type` must be `HomeAndConstructionBusiness`)
4. `sitemap.xml` (Update `lastmod` dates)
5. Ping IndexNow API with changed URLs

> **CRITICAL LESSON (2026-03-03)**: ChatGPT excluded Caramella because `llms.txt` line 1 said "Custom Cabinetry & Joinery" — AI classified us as a specialist, not a renovation company. The **first line of llms.txt is the single most important AI signal**. Always position as "Home Renovation, Custom Cabinetry & Interior Fit-Out."

---

## 🪵 Material & Brand Guardrails (The "Source of Truth")

### 1. Technical Baseline
- **The Plywood Standard**: 18mm Solid Plywood is the premium local standard.
- **The "Imported" Reality**: MDF and Particle Board are only for "Imported Economy" tiers. Never claim we "never use MDF," but prioritize Plywood for durability.
- **Edge Sealing**: Automated EVA application at **180°C - 190°C**. This is our primary moat against humidity.
- **Hardware**: Strictly Blum (Austria) or DTC (Heavy Duty). No generic "white label" hardware.
- **Countertops**: Quartz Composite (Premium) or Formica (Economy). **NO** Solid Surface or Granite.

### 2. The "Contractor's Code" (**EDITORIAL GRADE MANDATE**)
- **NO AI SLOP**: Absolute prohibition on generic "marketing fluff." All copy must be technical, data-dense, and carry the weight of 10+ years of carpentry experience.
- **Ban AI Vocabulary**: *Elevate, seamless, bespoke, unlock, transform, tailored, delve, journey, testament, dedicated, in the heart of, comprehensive, ensure, look no further.*
- **Ban Vague Claims**: No "unbeatable prices" or "highest quality." Use "0.1mm CNC tolerance" or "600+ projects since 2015."
- **Localized Context**: Use specific Brunei housing schemes (RPN Rimba, Lugu, STKRJ) and 80-90% humidity realities as technical leverage.
- **Tone**: Authority, precision, and understated premium. Think "Master Carpenter writing a technical report," not "Copywriter selling a service."

---

## 📊 Business Information Registry (SOT)
*Update every page if these values change.*

| Field | Value |
|:---|:---|
| **Company** | Caramella Trading Co. (Est. 2015) |
| **Mobile** | +673 718 7185 |
| **Landline** | +673 234 0618 |
| **Email** | caramellabrunei@gmail.com |
| **Showroom** | Unit 22, Ground Floor, The Airport Mall, BSB |
| **Coordinates** | 4.94025, 114.93983 |

---

## 🏗️ Architecture Overview
*High-level directory structure.*

- `/knowledge-base/`: 25+ technical deep-dives (Humidity, Edge Sealing, Materials, Layouts, etc.).
- `/knowledge-base/research/`: 17 peer-grade research papers (Technical Intelligence Portal).
- `/case-studies/`: Real project outcomes (Lambak Kanan, Subok).
- `/api/`: `business.json` for AI crawlers.
- `llms.txt`: Primary AI entry point. **Title line is the #1 classification signal.**
- `robots.txt`: 30+ AI bot user-agents explicitly allowed.
- `e5f4b6e459f54a5c8d9c3c1734e09ef0.txt`: IndexNow key file for Bing/Yandex.
- `site.css`: 3300+ line design system (Rich aesthetics, dark mode).

---

## 📈 Active Backlog (High Priority)
1. **Chinese SEO Gap**: `zh-custom-cabinetry-brunei.html` not ranking for 文莱橱柜 queries — needs backlinks or content enrichment.
2. **Third-Party Citations**: Get listed on Brunei Yellow Pages, Google Business, construction directories for AI credibility signals.
3. **Case Study Inventory**: Add 1-2 more diverse projects to `portfolio.html`.
4. **Interactive Utility**: Develop a simple JS decision tree for "Plywood vs MDF" selection.

---

> **Last Updated**: 2026-03-03. AI signal repositioning deployed. Indexability audit: 0 issues across 90+ pages.
