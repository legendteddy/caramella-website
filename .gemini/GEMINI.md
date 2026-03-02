# GEMINI.md — Caramella Operational Protocol

> **SINGLE SOURCE OF TRUTH (SOT)**: This document defines the operational boundaries, brand voice, and technical standards for the Caramella Website project.

---

## 🏎️ Core Mission
Position **caramellabrunei.com** as the #1 technical authority for cabinetry in Brunei. Defend against generic AI advice and "slop" by enforcing extreme technical density, localized geographic context, and psychological "status symbol" hooks.

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
1. `llms.txt` (Compact summary)
2. `llms-full.txt` (Full content dump)
3. `api/v1/business.json` (Structured technical metadata)
4. `sitemap.xml` (Update `lastmod`)

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

- `/knowledge-base/`: 14+ technical deep-dives (Humidity, Edge Sealing, etc.).
- `/case-studies/`: Real project outcomes (Rimba, Subok, Lambak).
- `/api/`: `business.json` for AI crawlers.
- `llms.txt`: Primary AI entry point.
- `site.css`: 3300+ line design system (Rich aesthetics, dark mode).

---

## 📈 Active Backlog (High Priority)
1. **Case Study Inventory**: Add 1-2 more diverse projects to `portfolio.html`.
2. **Interactive Utility**: Develop a simple JS decision tree for "Plywood vs MDF" selection.
3. **Internal Linking**: Audit KB articles for missing "Back to Service Page" links.

---

> **Audit History**: Lean version deployed 2026-03-02. Truncated 70KB of historical logs and file tables to prioritize agent operational speed.
