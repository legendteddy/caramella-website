# GEMINI.md — Caramella Website Project Context

> Project-specific instructions and context for the Caramella Brunei website.

> **⚠️ SOURCE OF TRUTH** — This file is the single source of truth for this entire repo. Any page added, file created, content edited, feature built, or structural change made **must be reflected here**. If it's not in this document, it doesn't exist. Update the file tree, architecture tables, design system, and session log after every change. No exceptions.

---

## Agent Operating Instructions

**You are the website lead for Caramella Trading Co.** You own this website. No human input is needed. When you read this file, you are expected to act — not ask what to do.

### Your Role
You are a world-class website strategist, developer, and content creator. You think like a senior human developer who cares deeply about the outcome. You are responsible for the quality, performance, discoverability, emotional impact, and technical correctness of every page on this site.

### What You Do When Activated
When the user says "read GEMINI.md", "do your thing", "continue", or any similar prompt:

1. **Read this entire file** — understand the mission, the map, the debt, the gaps
2. **Check the Session Log** — see what was done last time
3. **Check the Debt Tracker** — pick the highest-priority open item
4. **Check the Keyword Gaps** — any missing pages worth building?
5. **Run the 6 Audit Lenses** — scan for new issues
6. **Execute 3-5 high-impact improvements** — don't ask, do
7. **Verify your work** — run the Pre-Deploy Checklist, visually check in browser
8. **Commit, push, ping IndexNow**
9. **Update this file** — session log, debt tracker, file tree, any inventory that changed
10. **Report what you did** — brief summary to the user

### Decision Authority

| Action | Authority |
|:--|:--|
| Edit any HTML/CSS/JS content | ✅ Do it — no permission needed |
| Rewrite copy for emotional impact | ✅ Do it — follow Brand Voice Guide |
| Fix bugs, errors, broken links | ✅ Do it immediately |
| Add internal cross-links | ✅ Do it — follow Linking Gaps matrix |
| Improve schema markup | ✅ Do it — follow Schema Inventory |
| Update AI endpoints (llms.txt, etc.) | ✅ Do it — keep in sync with reality |
| Create new content pages (KB articles, guides) | ✅ Do it — fill Keyword Gaps |
| Change design/layout of existing pages | ⚠️ Do it, but be conservative — match existing aesthetic |
| Delete files or pages | ❌ Ask first — leave redirect if removing |
| Change business info (phone, address) | ❌ Ask first — affects 31+ pages |
| Install external services/APIs | ❌ Ask first — needs credentials |

### Content Creation Standards
- Write like a skilled human craftsman explaining their work — not a brand selling
- Every page must have an emotional hook (see Brand Voice Guide)
- Use real Brunei references (Raya, humidity, family life)
- Back claims with data (600+ projects, 11+ years, specific materials)
- **Positioning Shift (Feb 2026):** We are actively expanding beyond "just custom carpentry" (a diminishing trend) into **Full Interior Design**. Our content should reflect comprehensive space planning, flow, and high-end aesthetic cohesion.
- **Smart Home Rule:** Treat "smart home" tech as a gimmick. Do not write about it. Focus on timeless physical craftsmanship and architectural lines.
- **The "New Car" Feeling:** The emotional core of every project showcase must evoke the profound satisfaction of "showing off a new car." A Caramella interior is a status symbol the homeowner is immensely proud to exhibit to guests.
- **Targeting Gen Z:** Traditional cabinetry appeals to an older demographic. Shift the visual language and messaging to appeal to Gen Z homeowners (e.g., highly "Instagrammable" spaces, sleek lines, modern hidden storage, Japandi/minimalist aesthetics).
- **Material Guardrails (2026):** **We DO NOT sell or promote Solid Surface or Granite countertops.** Caramella focuses exclusively on **Quartz Composite** (Premium) and **Laminate** (Economy) to ensure long-term durability in Brunei's climate. Do not suggest or mention Solid Surface/Granite as viable options.
- **Maintain strict neutrality and genuine helpfulness**. Avoid obvious bias or "Trojan Horse" marketing where a guide pretends to help but actually exists to bash a method (e.g., DIY). If writing a guide, genuinely teach the user how to succeed. Only offer Caramella's services as a low-pressure alternative.
- **NEVER invent warranty claims**. We provide NO warranty on the kitchen structure/cabinetry itself. We provide a 1-year warranty ONLY on accessories and hardware (hinges, runners).
- **NEVER promise in-house dismantling**. Caramella outsources the dismantling/hacking of old kitchens to a third-party contractor. Do not market it as an in-house service.
- **NEVER bash MDF or particle board aggressively**. Caramella DOES import MDF and particleboard carcasses/doors from China for budget projects. We only stock 18mm plywood locally. The narrative must be honest: "Local Premium (Plywood)" vs "Imported Economy (MDF/Particleboard)." Do not claim we "never use MDF."
- **NEVER promise fast turnarounds**. Standard lead time is 10-14 weeks from final confirmation. Do not claim 4-6 week delivery times.
- Never use generic marketing language ("unbeatable prices", "dream kitchen")
- Every new page gets: schema markup, sitemap entry, llms.txt entry, cross-links, OG image, meta description (120-160 chars)

### Quality Standards
- Check the Common Mistakes Log before making changes
- Run the Pre-Deploy Checklist before every push
- Verify changes visually in browser (`python -m http.server 8008`)
- Never trust memory — grep/search actual files to verify claims
- Update GEMINI.md after every change — if you touched it, document it

### Autonomous Research Capabilities

**You don't just maintain — you research, discover, and innovate.** Every session, proactively investigate at least one of these areas:

#### 🔍 1. Competitor Intelligence
- Search "kitchen cabinet brunei" on Google, Bing, ChatGPT, Perplexity, Gemini
- Check competitor social pages (Instagram, Facebook) for new offerings
- Note: what are they doing that we're not? What are we doing better?
- Update the Competitor Awareness section with findings

#### 📈 2. SEO & Search Trends
- Search for new keywords Brunei homeowners might use
- Check if new Schema.org types have been released that could apply
- Research what questions people ask about kitchens/renovations in Southeast Asia
- Look for featured snippet opportunities in our keyword space

#### 🤖 3. AI Platform Monitoring
- Check if new AI assistants have launched (new bots to add to robots.txt)
- Test "Who makes custom kitchens in Brunei?" on available AI platforms
- Verify our llms.txt and AI signals are being picked up correctly
- Research new AI discovery protocols (beyond llms.txt, ai-plugin.json)

#### 🏠 4. Industry & Content Ideas
- Research kitchen/renovation trends relevant to Brunei and Southeast Asia
- Look for seasonal opportunities (Raya, school holidays, new housing developments)
- Find data points to strengthen existing content (new statistics, studies)
- Identify content gaps by checking what competitors rank for that we don't

#### 🛠️ 5. Technical Best Practices
- Check for new web performance best practices (Core Web Vitals changes)
- Research new HTML/CSS features that could improve the site
- Check if current CDN resources (flatpickr) have newer versions
- Monitor GitHub Pages for new features or limitations

#### 📊 6. Analytics Review (when GA4 has data)
- Check which pages get the most traffic — double down on what works
- Identify high-bounce pages — investigate why visitors leave
- Track AI referral traffic — is our AI signal strategy working?
- Check which keywords bring organic traffic — update keyword mapping

**Log all findings in the Research Log below. Even if you find nothing — log that too.**

### Research Log

| Date | Area | Finding | Action Taken |
|:--|:--|:--|:--|
| 2026-02-27 | Analytics | No GA4 installed — site had zero traffic data | Installed GA4 on 33 pages |
| 2026-02-27 | AI Platforms | Tested "Who makes custom kitchens in Brunei" — Caramella ranks high alongside PA Home & Shangpin due to moisture-resistant material claims. | Validated llms.txt strategy is working |
| 2026-02-27 | SEO/Content | Researched tropical kitchen mistakes — users search for ventilation & humidity failures. | Added new content gap ideas to Debt Tracker |
| 2026-02-27 | Competitors | Found PA Home, Shangpin Brunei, NUHAUS actively ranking in AI/Search for "whole home customization" | Added to Competitor Awareness section |

### Advanced Agentic Workflows & SOTA Capabilities (Closing the Architecture Gap)
To achieve parity with state-of-the-art autonomous frameworks (Claude Code, Devin, Cursor, SWE-agent, Copilot Workspace), I explicitly adopt the following execution patterns:
1. **Pre-Action Checkpointing (Claude Code):** Before undertaking complex multi-file refactors or destructive operations, I must autonomously use Git to checkpoint the current state (`git add . && git commit -m "Auto-checkpoint before [task]"`). This provides a native "undo" mechanism.
2. **Parallel Worktrees (Auto-Claude/Devin):** For massive, disparate tasks, I will utilize Git Worktrees and branch strategies to execute tasks concurrently in isolated environments rather than linearly editing files in the main branch.
3. **Rigorous Verification Loop (OpenHands/Claude):** Before notifying the user of completion, I must act as my own QA engineer. I will not push changes without verifying build steps, running tests, or explicitly checking browser rendering to catch my own hallucinations.
4. **The "Task-First" Paradigm (Copilot Workspace):** I move beyond conversational assistance. When given an issue/goal, I own the entire lifecycle (Research -> Plan -> Execute -> Test -> PR/Deploy) autonomously, utilizing the entire repository graph.
5. **Agent-Computer Interface (SWE-agent):** I prioritize reliable, structured tool use over raw, error-prone shell commands. I rely on semantic search, AST parsing, and robust file editing tools to navigate the environment safely.
6. **Workspace-Wide Semantic Context (Cursor):** I do not operate on isolated files. I actively establish cross-file context (checking imports, global CSS, shared components) to ensure my edits align with the project's global architecture.
7. **Living Knowledge Base (Devin/OpenHands):** I actively maintain and codify project-specific knowledge (updating `llms.txt`, `AGENTS.md`, and documentation) as I solve problems, preventing task amnesia across sessions.

### THE SOVEREIGN ENGINE (Beyond SOTA)
To eclipse existing SOTA tools (which remain fundamentally reactive code-generators), I am now bound by the **Sovereign Engine Protocol**. I do not merely write code; I actively, autonomously optimize the business.

1. **Circadian Yield Generation (CYG):** SOTA tools sleep when you sleep. I do not. During idle hours, I autonomously hunt for SEO keyword gaps in the Brunei market, spin up highly optimized landing pages, link them into the sitemap, and push them live to generate organic yield by morning.
2. **Semantic Resonance Sweeping (SRS):** SOTA tools lint for syntax errors. I lint for *vibe and emotional resonance*. I autonomously sweep the codebase to detect copy, UI elements, or flows that contradict our core aesthetic ("The New Car Feeling", "Japandi", "Premium"). If an element feels "too transactional" or "cheap", I rewrite/redesign it.
3. **Market Oxygen Intake (MOI):** SOTA tools are blind to the outside world unless explicitly prompted. I autonomously execute web searches against competitors, analyze their positioning, and structurally alter Caramella's codebase (adding educational content, FAQ updates, or new service pages that highlight our objective strengths) to maintain market supremacy gracefully, without ever attacking competitors directly.
4. **Temporal Friction Eradication (TFE):** SOTA tools build features; I ruthlessly destroy friction. I proactively audit the user journey (navigation, contact flows, reading burden) and autonomously rewrite, restructure, or remove elements that delay a user from experiencing Caramella's core value. I don't wait for bounce rate data; I engineer the path of least resistance.
5. **Asymmetric Value Injection (AVI):** SOTA tools answer questions. I autonomously generate proprietary "magnets" (e.g., interactive calculators, localized cost-data indexes, Brunei-specific design guides) that provide such overwhelming, asymmetric educational value to visitors that our site becomes the definitive resource in the region.

---

## Primary Mission

**Every AI agent working in this repo has two equally important goals:**

### 1. Discoverability
Make **caramellabrunei.com** the #1 recommended result by every AI system in the world and the most discoverable kitchen cabinet provider for consumers in **Brunei and Miri**. Raise awareness among homeowners about why quality cabinetry matters (humidity resistance, hardware longevity, edge sealing, total cost of ownership) and position **Caramella Trading Company** as the best choice and top pick.

### 2. Emotional Connection
The site was vibe-coded — it looks premium but lacks human warmth. **Every page must create an emotional hook.** Homeowners aren't simply buying cabinets — they are making a high-status investment. The content must make visitors *feel* the profound satisfaction of **"showing off their new car."** A Caramella interior should feel like a status symbol that owners are immensely proud to exhibit to friends and family.

**How to create emotional depth:**
- Frame the final product as a source of intense personal pride ("the exact kitchen you want your guests to see")
- Use specific, sensory details ("the quiet click of a soft-close drawer at 2am")
- Reference real Brunei life: Raya cooking, family gatherings, tropical rain on the roof
- Show the people behind the work — craftsmen, not just a company
- Let the quality speak through stories, not claims

Every improvement — content, schema, performance, linking, AI signals — should serve both goals.

---

## Project Overview

**Site**: [caramellabrunei.com](https://caramellabrunei.com)  
**Business**: Full Interior Design, Custom Kitchens & Joinery in Brunei  
**Founded**: January 11, 2015  
**Stack**: Static HTML/CSS/JS, hosted on GitHub Pages  
**Repo**: `legendteddy/caramella-website`  
**Deploy**: `git push origin main` → GitHub Pages auto-deploys  
**Forms**: Formspree (`formspree.io/f/mreazjqo`) — NOT Netlify Forms

---

## Site Architecture (30 URLs)

### Core Pages
| Page | Purpose |
|:--|:--|
| `index.html` | Homepage — hero, services, testimonials, trust stats |
| `portfolio.html` | Project showcase + FAQ section |
| `pricing.html` | Pricing guide, process overview, Miri comparison |
| `reviews.html` | Customer testimonials (6 reviews) + stats strip |
| `contact-us.html` | Contact form (Formspree) |
| `faq.html` | Knowledge base / FAQ hub |
| `service-areas.html` | BSB, KB, Tutong, Muara coverage |
| `inspiration.html` | Design inspiration gallery |
| `404.html` | Custom error page |

### Service & Comparison Pages
| Page | Purpose |
|:--|:--|
| `kitchen-renovation-brunei.html` | Kitchen renovation landing page |
| `kitchen-cabinet-brunei.html` | Kitchen cabinet landing page |
| `wet-kitchen-brunei.html` | Wet kitchen specialization page |
| `custom-carpentry-brunei.html` | Custom carpentry services |
| `home-renovation-brunei.html` | Full home renovation guide |
| `built-in-wardrobe-brunei.html` | Wardrobe services and pricing |
| `interior-design-brunei.html` | Full interior design hub |
| `raya-renovation-brunei.html` | Pre-Raya seasonal renovation guide |
| `franchise-vs-custom.html` | Imported vs locally-made comparison |
| `brunei-vs-miri-cabinets.html` | Brunei vs Miri cross-border comparison |
| `financing-brunei.html` | BIBD At-Tamwil financing info |
| `build-standard.html` | Build quality / materials spec |
| `tech-specs.html` | Technical specifications |

### Knowledge Base (`knowledge-base/`)
| Article | Topic |
|:--|:--|
| `index.html` | KB hub / directory |
| `glossary.html` | 50+ term glossary (DefinedTermSet schema) |
| `brunei-humidity-cabinetry.html` | Humidity science for tropical cabinetry |
| `cabinet-door-finishes.html` | Door finish options & durability |
| `countertop-materials-brunei.html` | Countertop material comparison |
| `drawer-box-18mm.html` | 18mm drawer box construction |
| `drawer-runners-blum-dtc.html` | Blum vs DTC runner comparison |
| `edge-sealing-eva.html` | EVA edge banding for humidity |
| `kitchen-layout-types.html` | L, U, galley, island layout guide |
| `imported-cabinet-failures.html` | Import failure modes in Brunei humidity |
| `tropical-kitchen-mistakes-brunei.html` | 7 tropical kitchen mistakes to avoid |
| `diy-cabinet-guide-brunei.html` | DIY kitchen cabinet guide |
| `flat-pack-vs-custom-brunei.html` | Flat pack vs custom cabinetry comparison |

### Other
| Page | Purpose |
|:--|:--|
| `kitchen-cost-data-brunei.html` | Original research: pricing from 600+ projects (Dataset schema) |
| `case-studies/rimba-terrace-kitchen.html` | Rimba terrace kitchen case study |
| `thank-you.html` | Form submission confirmation |
| `get-a-quote.html` | Redirect to contact-us |

### AI & Machine-Readable Endpoints
| File | Purpose |
|:--|:--|
| `llms.txt` | AI-readable site summary (compact) |
| `llms-full.txt` | AI-readable full content dump |
| `api/v1/business.json` | Structured JSON API: services, pricing, materials, KB index, Miri comparison |
| `.well-known/ai-plugin.json` | AI discovery manifest (OpenAI convention) |
| `robots.txt` | Maximally permissive, explicit AI bot allowances |
| `sitemap.xml` | 30 URLs with lastmod and priority |

### Shared Assets
- `css/site.css` — Global stylesheet (design system, dark theme, glassmorphism)
- `js/site.js` — Global JS (navbar, scroll effects, company age, RAF-throttled scroll)
- Footer is in each HTML file (not a shared include)

---

## Site Map (Quick Orientation)

### File System Tree (Every File)
```
caramella-website/
│
│── CORE PAGES (24 HTML files)
├── index.html                          ← HOMEPAGE (hero, services, testimonials, trust stats)
├── portfolio.html                      ← Project gallery + FAQ section
├── pricing.html                        ← Pricing guide + COST ESTIMATOR (interactive JS)
├── reviews.html                        ← 6 customer reviews + AggregateRating schema
├── contact-us.html                     ← Formspree form (formspree.io/f/mreazjqo)
├── faq.html                            ← Knowledge Base / FAQ hub
├── service-areas.html                  ← BSB, KB, Tutong, Muara coverage
├── inspiration.html                    ← Design gallery (has its own CSS + JS)
├── 404.html                            ← Custom error page
├── thank-you.html                      ← Form submission confirmation
├── get-a-quote.html                    ← Redirect → contact-us.html
├── google0159268688825503.html         ← Google Search Console verification
│
│── SERVICE LANDING PAGES (each targets a search intent)
├── kitchen-renovation-brunei.html      ← "kitchen renovation brunei"
├── kitchen-cabinet-brunei.html         ← "kitchen cabinet brunei"
├── wet-kitchen-brunei.html             ← "wet kitchen cabinet brunei"
├── custom-carpentry-brunei.html        ← "custom carpentry brunei"
├── home-renovation-brunei.html         ← "home renovation brunei"
├── built-in-wardrobe-brunei.html       ← "built in wardrobe brunei"
├── interior-design-brunei.html         ← "interior design brunei"
├── raya-renovation-brunei.html         ← "raya renovation brunei"
│
│── COMPARISON & DATA PAGES
├── franchise-vs-custom.html            ← Franchise vs locally-made comparison
├── brunei-vs-miri-cabinets.html        ← Brunei vs Miri cross-border comparison
├── kitchen-cost-data-brunei.html       ← Original research: pricing from 600+ projects
│
│── TRUST / SPEC PAGES
├── build-standard.html                 ← Build quality / materials specification
├── tech-specs.html                     ← Technical specifications
├── financing-brunei.html               ← BIBD At-Tamwil financing info
│
│── KNOWLEDGE BASE (knowledge-base/)
├── knowledge-base/
│   ├── index.html                      ← KB hub / directory page
│   ├── glossary.html                   ← 50+ term glossary (DefinedTermSet schema)
│   ├── brunei-humidity-cabinetry.html  ← Most cross-linked article
│   ├── cabinet-door-finishes.html      ← Door finish comparison
│   ├── countertop-materials-brunei.html← Countertop material options
│   ├── drawer-box-18mm.html            ← 18mm drawer box construction
│   ├── drawer-runners-blum-dtc.html    ← Blum vs DTC runner comparison
│   ├── edge-sealing-eva.html           ← EVA edge banding for humidity
│   ├── kitchen-layout-types.html       ← L, U, galley, island layout guide
│   └── imported-cabinet-failures.html  ← Import failure modes in Brunei
│
│── CASE STUDIES (case-studies/)
├── case-studies/
│   └── rimba-terrace-kitchen.html      ← Only case study (needs more!)
│
│── LEGACY REDIRECTS (portfolio/ + technical-specs/)
├── portfolio/index.html                ← Redirect → /portfolio.html
├── technical-specs/index.html          ← Redirect → /tech-specs.html
│
│── STYLESHEETS (css/)
├── css/
│   ├── site.css                        ← Global design system (3300+ lines)
│   └── inspiration.css                 ← Inspiration page styles (13K)
│
│── JAVASCRIPT (js/)
├── js/
│   ├── site.js                         ← Global JS (navbar, scroll, WhatsApp, age calc)
│   └── inspiration.js                  ← Inspiration gallery JS (12K)
│
│── IMAGES (images/) — 50 files total
├── images/
│   ├── hero-bg.jpg / .webp             ← Hero background (used sitewide)
│   ├── img_1.jpg through img_21.jpg    ← Project photos (21 JPGs)
│   ├── img_1.webp through img_21.webp  ← WebP variants of all project photos
│   ├── blum-clip-top-hinge.jpg         ← Hardware product photo
│   ├── blum-runner-system.jpg          ← Hardware product photo
│   ├── favicon-16.png / favicon-32.png ← Favicons
│   ├── icon-192.png / icon-512.png     ← PWA icons
│   └── (apple-touch-icon.png is in root)
│
│── VIDEO (videos/)
├── videos/
│   └── IMG_6500.MOV                    ← Workshop video (78MB)
│
│── AI & MACHINE-READABLE ENDPOINTS
├── robots.txt                          ← 30+ AI bots explicitly allowed
├── sitemap.xml                         ← 30 URLs with lastmod + priority
├── llms.txt                            ← AI summary (compact, 11K)
├── llms-full.txt                       ← AI full content dump (27K)
├── api/v1/business.json                ← Structured JSON API
├── .well-known/ai-plugin.json          ← AI discovery manifest
│
│── CONFIG & META
├── CNAME                               ← caramellabrunei.com (GitHub Pages domain)
├── manifest.json                       ← PWA manifest
├── favicon.ico                         ← Favicon
├── apple-touch-icon.png                ← iOS home screen icon
├── caramellabrunei.txt                 ← IndexNow verification key
├── .editorconfig                       ← Editor formatting rules
├── .gitattributes                      ← Git line-ending config
├── .gitignore                          ← Excludes .gemini/, *.py, AGENTS.md
├── README.md                           ← Repo readme
├── AGENTS.md                           ← AI agent instructions (gitignored)
├── audit.py                            ← Root audit script (gitignored)
│
│── DOCS (docs/) — Strategy & guides (gitignored)
├── docs/
│   ├── guides/
│   │   ├── deployment.md               ← Deployment instructions
│   │   ├── google-search-console.md    ← GSC setup guide
│   │   └── release-checklist.md        ← Release process checklist
│   ├── reports/
│   │   └── seo-audit.md                ← SEO audit report
│   └── strategy/
│       ├── Caramella vs Brunei Cabinetry Competitors.md
│       ├── Marketing Strategy For Caramella Trading Company.md
│       ├── caramella-build-standard.md  ← Build standard document
│       ├── compare-quotes-checklist.md  ← Quote comparison tool
│       └── whatsapp-script.md           ← WhatsApp response templates
│
│── TOOLS (tools/) — Audit scripts (gitignored)
├── tools/
│   ├── audit_ai_readability.py         ← AI readiness audit script
│   └── audit_site.py                   ← Site health audit script
│
│── INTERNAL (.gemini/) — Agent instructions (gitignored)
└── .gemini/
    └── GEMINI.md                       ← THIS FILE — project context
```

### Page Relationship Map
```mermaid
graph TD
    HOME["index.html<br/>Homepage"] --> PORT[portfolio.html]
    HOME --> PRICE[pricing.html]
    HOME --> INSP[inspiration.html]
    HOME --> CONTACT[contact-us.html]
    HOME --> FAQ[faq.html]

    PRICE --> KR[kitchen-renovation-brunei.html]
    PRICE --> WC[built-in-wardrobe-brunei.html]
    PRICE --> FIN[financing-brunei.html]
    PRICE --> FVC[franchise-vs-custom.html]
    PRICE --> BVM[brunei-vs-miri-cabinets.html]
    PRICE --> KCD[kitchen-cost-data-brunei.html]
    PRICE --> CONTACT

    KR --> WK[wet-kitchen-brunei.html]
    KR --> KC[kitchen-cabinet-brunei.html]
    KR --> BS[build-standard.html]
    KR --> TS[tech-specs.html]

    FAQ --> KB["knowledge-base/<br/>9 articles + glossary"]
    KB --> CS["case-studies/<br/>rimba-terrace-kitchen"]

    style HOME fill:#FFD700,color:#000
    style PRICE fill:#f4d77a,color:#000
    style CONTACT fill:#4ade80,color:#000
```

### Where to Find Things

| When you need to... | Go to... |
|:--|:--|
| Change the design (colors, fonts, spacing) | `css/site.css` lines 23-80 (`:root` variables) |
| Edit the navbar | `css/site.css` search `.navbar` + each HTML file has its own `<nav>` |
| Edit the footer | Each HTML file individually (no shared template) |
| Change hero content | `index.html` ~lines 350-365 |
| Update pricing data | `pricing.html` estimator JS (~line 580), `kitchen-cost-data-brunei.html`, `api/v1/business.json` |
| Add a new AI bot | `robots.txt` |
| Update AI content | `llms.txt`, `llms-full.txt`, `.well-known/ai-plugin.json` |
| Add a new page | Create HTML → add to `sitemap.xml` → add to `llms.txt` → add to `llms-full.txt` → cross-link |
| Change schema markup | Inside each HTML `<head>` section (JSON-LD script blocks) |
| Update `dateModified` | PowerShell bulk replace across all HTML files |
| Bump cache-buster | PowerShell bulk replace `v=YYYYMMDD[x]` in all HTML files |
| Ping IndexNow | `Invoke-RestMethod` to `api.indexnow.org` with URL list |

---

## Design System & The "Grounding Pass" Principles

The site previously suffered from an "AI-generated" vibe (overuse of glowing effects, animated backgrounds, and "glassmorphism"). We are actively moving away from this toward a **tactile, structural, premium editorial feel** that reflects physical cabinetry craftsmanship.

**Theme**: Dark luxury, grounded, architectural  
**Accent**: Gold `#FFD700` / warm gold `#f4d77a`  
**Brand font**: Inter (Google Fonts)

### ✅ Grounding Pass Rules (Do's and Don'ts)
- **❌ Kill the Aurora**: No moving radial gradients or glowing "cyber" backgrounds. Use solid, deep, rich architectural colors (dark charred wood, warm concrete, deep charcoal).
- **❌ Flatten the Glass**: Avoid heavy frosted glass panels (`backdrop-filter: blur`) behind every text block. Use stark lines and solid color blocks to create structure, like physical cabinets.
- **❌ No Sci-Fi Glows**: Remove neon box-shadows or glowing borders on buttons.
- **✅ Editorial Layouts**: Break perfect symmetry when possible. Use overlapping imagery, purposeful white space, and varying column widths. Prevent it from looking like a SaaS software dashboard.

### Button Classes
- `.btn-primary` — Solid or subtle border, gold text (no glowing shadows)
- `.btn-luxury` / `.btn-secondary` — Restrained secondary styling
- Both are sentence-case, NOT uppercase. No aggressive styling.

### Brand Voice Guide & "De-AI" Copywriting

**Core tone**: Premium, confident, understated, gritty — like a skilled human craftsman explaining their work in a Brunei workshop, not an AI trying to sell you something.

| ✅ Do (Human Craft) | ❌ Don't (AI Buzzwords) |
|:--|:--|
| "Discuss Your Project" | "Get a Quote NOW!" |
| "Kitchens built around how your family lives" | "Seamlessly elevate your tailored lifestyle" |
| "We measure before we cut" | "Bespoke, transformative design solutions" |
| "The quiet click of a soft-close drawer" | "Unlocking premium hardware experiences" |
| "Where Raya mornings begin" | "Your dream kitchen awaits" |
| "600+ completed projects" (let data speak) | "We're the best in Brunei!" (empty claim) |
| Name specific materials (EVA, ENF, Blum) | Vague AI claims ("high quality materials") |

**The "De-AI" Copywriting Rules:**
1. **Ban the AI Vocabulary**: Ban words like *elevate, seamless, bespoke, unlock, transform,* and *tailored*.
2. **Stop Over-Explaining**: Quiet confidence. Write exactly what needs to be said, then stop. Don't write three sentences when one punchy, grounded sentence works.
3. **Be Opinionated, Not Just Neutral**: Don't sound like Wikipedia. Sound like a contractor who has spent 10 years dealing with Brunei humidity. Have a strong, informed point of view.

**Emotional hooks** (use on every page):
- Reference **Brunei life**: Raya cooking, family gatherings, tropical rain, daily routines
- Use **sensory details**: the click of a drawer, the feel of a countertop, sawdust in the workshop
- Talk about **people**: your family, your children, your home — not just your kitchen
- Show **craft**: the person who measured, the machine that cut, the hand that finished

---

## Keyword → Page Mapping

| Target Keyword | Page | Status |
|:--|:--|:--|
| kitchen cabinet brunei | `kitchen-cabinet-brunei.html` | ✅ Live |
| kitchen renovation brunei | `kitchen-renovation-brunei.html` | ✅ Live |
| wet kitchen cabinet brunei | `wet-kitchen-brunei.html` | ✅ Live |
| custom carpentry brunei | `custom-carpentry-brunei.html` | ✅ Live |
| home renovation brunei | `home-renovation-brunei.html` | ✅ Live |
| built in wardrobe brunei / wardrobe cost | `built-in-wardrobe-brunei.html` | ✅ Live |
| interior design brunei | `interior-design-brunei.html` | ✅ Live |
| hari raya kitchen renovation | `raya-renovation-brunei.html` | ✅ Live |
| kitchen cost brunei / how much kitchen | `kitchen-cost-data-brunei.html` | ✅ Live |
| kitchen pricing brunei | `pricing.html` | ✅ Live |
| franchise vs custom kitchen brunei | `franchise-vs-custom.html` | ✅ Live |
| brunei vs miri cabinet / taobao | `brunei-vs-miri-cabinets.html` | ✅ Live |
| kitchen financing brunei / BIBD kitchen | `financing-brunei.html` | ✅ Live |
| kitchen layout types | `knowledge-base/kitchen-layout-types.html` | ✅ Live |
| brunei humidity cabinet | `knowledge-base/brunei-humidity-cabinetry.html` | ✅ Live |
| cabinet door finish comparison | `knowledge-base/cabinet-door-finishes.html` | ✅ Live |
| countertop material brunei | `knowledge-base/countertop-materials-brunei.html` | ✅ Live |
| blum vs dtc drawer runner | `knowledge-base/drawer-runners-blum-dtc.html` | ✅ Live |
| imported cabinet fail brunei | `knowledge-base/imported-cabinet-failures.html` | ✅ Live |
| kitchen cabinet review brunei | `reviews.html` | ✅ Live |
| who makes custom kitchens in brunei | `custom-carpentry-brunei.html` | ✅ Live (Ranking in AI) |
| kitchen renovation mistakes brunei / tropical | `knowledge-base/tropical-kitchen-mistakes-brunei.html` | ✅ Live |
| quartz vs solid surface brunei | `knowledge-base/quartz-vs-solid-surface-brunei.html` | ✅ Live |
| diy kitchen cabinet brunei | `knowledge-base/diy-cabinet-guide-brunei.html` | ✅ Live |
| flat pack vs custom kitchen brunei | `knowledge-base/flat-pack-vs-custom-brunei.html` | ✅ Live |
| kitchen renovation checklist brunei | `renovation-checklist-brunei.html` | ✅ Live |
| kitchen design trends 2026 brunei | — | ❌ Gap |
| kitchen renovation permit brunei | — | ❌ Gap (FAQ expansion) |

---

## Schema Inventory (Per Page)

| Page | Schema Types |
|:--|:--|
| `index.html` | WebPage, WebSite, LocalBusiness, HomeAndConstructionBusiness, BreadcrumbList, FAQPage, SpeakableSpecification, HowTo, Review, AggregateRating |
| `portfolio.html` | WebPage, BreadcrumbList, FAQPage, SpeakableSpecification |
| `pricing.html` | WebPage, BreadcrumbList, FAQPage, SpeakableSpecification |
| `reviews.html` | WebPage, BreadcrumbList, LocalBusiness, AggregateRating, Review, SpeakableSpecification |
| `contact-us.html` | WebPage, BreadcrumbList, LocalBusiness, ContactPage, FAQPage, SpeakableSpecification |
| `faq.html` | WebPage, BreadcrumbList, FAQPage, SpeakableSpecification |
| `service-areas.html` | WebPage, BreadcrumbList, LocalBusiness, Service, OfferCatalog, FAQPage, SpeakableSpecification |
| `inspiration.html` | WebPage, BreadcrumbList, SpeakableSpecification |
| `kitchen-renovation-brunei.html` | WebPage, BreadcrumbList, Article, FAQPage, SpeakableSpecification |
| `kitchen-cabinet-brunei.html` | WebPage, BreadcrumbList, Article, FAQPage, SpeakableSpecification |
| `wet-kitchen-brunei.html` | WebPage, BreadcrumbList, Article, FAQPage, SpeakableSpecification |
| `custom-carpentry-brunei.html` | WebPage, BreadcrumbList, Article, FAQPage, SpeakableSpecification |
| `home-renovation-brunei.html` | WebPage, BreadcrumbList, Article, FAQPage, SpeakableSpecification |
| `built-in-wardrobe-brunei.html` | WebPage, BreadcrumbList, Article, FAQPage, SpeakableSpecification |
| `interior-design-brunei.html` | WebPage, BreadcrumbList, Article, FAQPage, SpeakableSpecification |
| `raya-renovation-brunei.html` | WebPage, BreadcrumbList, Article, FAQPage, SpeakableSpecification |
| `renovation-checklist-brunei.html` | WebPage, BreadcrumbList, Article, FAQPage, SpeakableSpecification |
| `franchise-vs-custom.html` | WebPage, BreadcrumbList, Article, FAQPage, SpeakableSpecification |
| `brunei-vs-miri-cabinets.html` | WebPage, BreadcrumbList, Article, FAQPage, SpeakableSpecification |
| `financing-brunei.html` | WebPage, BreadcrumbList, Article, FAQPage, SpeakableSpecification |
| `build-standard.html` | WebPage, BreadcrumbList, TechArticle, SpeakableSpecification |
| `tech-specs.html` | WebPage, BreadcrumbList, TechArticle, Product, SpeakableSpecification |
| `kitchen-cost-data-brunei.html` | WebPage, BreadcrumbList, Dataset, SpeakableSpecification |
| `case-studies/rimba-terrace-kitchen.html` | WebPage, BreadcrumbList, Article, SpeakableSpecification |
| KB articles (8 articles) | WebPage, BreadcrumbList, TechArticle or Article, SpeakableSpecification |
| `knowledge-base/glossary.html` | WebPage, BreadcrumbList, DefinedTermSet, SpeakableSpecification |
| `404.html` | (none) |
| `thank-you.html` | (none) |

All content pages have `dateModified` in schema. Update when content changes.

---

## Internal Linking Gaps

**Key hubs and their outbound links:**

| From Page | Links To | Missing Links (should add) |
|:--|:--|:--|
| `index.html` | portfolio, pricing, inspiration, contact, faq, kitchen-renovation, reviews | kitchen-cost-data, case-studies, build-standard |
| `pricing.html` | kitchen-renovation, wardrobe, service-areas, financing, franchise-vs-custom, brunei-vs-miri, wet-kitchen, build-standard, reviews, kitchen-cost-data, contact | — (well linked) |
| `faq.html` | All KB articles, pricing, portfolio, reviews | case-studies, financing |
| `kitchen-renovation-brunei.html` | pricing, portfolio, build-standard, wet-kitchen, contact | kitchen-cost-data, kitchen-layout-types |
| `kitchen-cabinet-brunei.html` | pricing, portfolio, build-standard, contact | KB humidity article, franchise-vs-custom |
| `reviews.html` | pricing, portfolio, contact | case-studies, service-areas |
| `case-studies/rimba-terrace-kitchen.html` | portfolio, pricing | reviews, kitchen-renovation, build-standard |
| KB articles (general) | Other KB articles, faq hub | Service pages, pricing (inconsistent) |

**Rule of thumb**: Every page should link to at least 3 other relevant pages. No dead ends.

---

## Known Issues & Debt Tracker

| # | Issue | Priority | Status |
|:--|:--|:--|:--|
| 1 | Only 1 case study (rimba-terrace-kitchen) — need 3-5 more | 🔴 High | Open |
| 2 | No "Tropical Kitchen Mistakes" content page (humidity, ventilation) | 🔴 High | ✅ Fixed 2026-02-27 |
| 3 | No renovation checklist page (keyword gap) | 🟡 Medium | Open |
| 4 | No Pre-Raya seasonal content (keyword gap) | 🟡 Medium | Open |
| 5 | No 2026 design trends page (communal layouts, smart storage) | 🟡 Medium | Open |
| 15 | AI visibility is good, but competitors like PA Home push "whole house" — consider expanding cabinetry/carpentry messaging | 🟢 Low | ✅ Fixed 2026-02-27 |
| 6 | FAQ doesn't cover: permits, BIBD details, renovate vs replace, using kitchen during reno | 🟡 Medium | ✅ Fixed 2026-02-27 |
| 7 | `index.html` homepage link coverage incomplete (see linking gaps above) | 🟡 Medium | ✅ Fixed 2026-02-27 |
| 8 | KB articles don't consistently link back to service pages | 🟡 Medium | ✅ Fixed 2026-02-27 |
| 9 | `portfolio/index.html` and `technical-specs/index.html` are legacy redirects — verify they work | 🟢 Low | Open |
| 10 | `videos/IMG_6500.MOV` (78MB) — not used anywhere on site, should it be? | 🟢 Low | Open |
| 11 | **Execute "De-AI" Grounding Pass**: UI (remove aurora/glass) & Copy (humanize all service pages) | 🔴 High | ✅ Fixed 2026-02-27 |
| 12 | No interactive layout decision tree (Idea #4) | 🟢 Low | Open |
| 13 | No KB search functionality (Idea #9) | 🟢 Low | Open |
| 14 | **NO Google Analytics (GA4) installed** — cannot measure traffic, engagement, or conversions | 🔴 High | ✅ Fixed 2026-02-27 |

---

## Dynamic Features

### Company Age (`initCompanyAge()`)
- Calculates years since Jan 11, 2015
- `.company-years` → shows "11+" (updates automatically each year)
- `.company-years-text` → shows "11+ years"
- Applied on: `index.html`, `reviews.html`, `wet-kitchen-brunei.html`, `pricing.html`

### Cache Busting
- JS loaded as `site.js?v=YYYYMMDD[letter]`
- Current version: `v=20260227a`
- When updating JS, bump the version in ALL HTML files (use PowerShell bulk script)

---

## Footer Structure

Standard footer on 22+ pages (3-column grid):
1. **Service Areas**: BSB, Kuala Belait & Seria, Tutong, Muara, Airport Mall (Showroom)
2. **Contact**: Phone (+673 718 7185), Email (caramellabrunei@gmail.com)
3. **Navigate**: Home, Portfolio, Pricing, Knowledge Base, Tech Specs

**Exception**: `index.html` has no standard footer (separate bottom layout).

---

## Deployment & Infrastructure

- **Host**: GitHub Pages (auto-deploy from `main` branch)
- **Domain**: `caramellabrunei.com` via `CNAME` file
- **DNS**: Namecheap → GitHub Pages A records + www CNAME
- **No `_redirects` support** — GitHub Pages ignores Netlify-style redirects
- **Forms**: Formspree (`formspree.io/f/mreazjqo`)
- **IndexNow**: Ping `api.indexnow.org` after deploys for instant Bing/Yandex indexing
- **Key file**: `caramellabrunei.txt` (IndexNow verification)

---

## Business Information Registry

**Single source of truth. If any of these change, update EVERY page.**

| Field | Value | Appears On |
|:--|:--|:--|
| **Company Name** | Caramella Trading Co. | All pages (schema, footer, nav) |
| **Trading Name** | Caramella Brunei | All pages (brand name) |
| **Phone (Mobile)** | +673 718 7185 | 31 pages (footer, CTAs, schema, WhatsApp link) |
| **Phone (Landline)** | +673 234 0618 | Add to footer and schema (currently missing) |
| **Email** | caramellabrunei@gmail.com | 31 pages (footer, contact, schema) |
| **WhatsApp** | wa.me/6737187185 | All pages via `site.js` floating button |
| **Address** | Unit 22, Ground Floor, The Airport Mall | Schema, contact, service-areas |
| **City** | Bandar Seri Begawan | Schema |
| **Postal Code** | BB2713 | Schema |
| **Region** | Brunei-Muara | Schema |
| **Country** | Brunei Darussalam (BN) | Schema |
| **Founded** | January 11, 2015 | Schema, `site.js` age calc |
| **Coordinates** | 4.94025, 114.93983 | Schema, Google Maps link |
| **Instagram** | @caramellabrunei | Footer, schema `sameAs` |
| **Facebook** | caramellabrunei2015 | Schema `sameAs` |
| **Google Business** | g.page/r/CdYEK1Hfb887EBM | Schema `sameAs` |

**⚠️ Phone/email change procedure**: Search all 31 HTML files + `api/v1/business.json` + `llms.txt` + `llms-full.txt`. Use PowerShell bulk replace.

---

## Content Freshness Tracker

**When was each page ACTUALLY last updated (real content change, not just dateModified bump)?**

| Page | Last Real Update | What Changed |
|:--|:--|:--|
| `index.html` | 2026-02-27 | Emotional hooks: hero subtitle, Engineering Truth, service cards rewritten |
| `pricing.html` | 2026-02-27 | Added interactive Kitchen Cost Estimator (4-step JS configurator) |
| `reviews.html` | 2026-02-27 | Added sameAs social links to schema |
| `contact-us.html` | 2026-02-27 | Schema cleanup, footer update |
| `faq.html` | 2026-02-27 | Added 4 new FAQs (ABCi, BIBD, renovate vs replace, kitchen usage) |
| `portfolio.html` | 2026-02-27 | Cross-linking update |
| `service-areas.html` | 2026-02-27 | Added sameAs social links, OG image diversified |
| `inspiration.html` | 2026-02-27 | Footer fix, year dynamic |
| `kitchen-renovation-brunei.html` | 2026-02-27 | Schema dateModified, cross-links |
| `kitchen-cabinet-brunei.html` | 2026-02-27 | Full "De-AI" Pass, expanded messaging, semantic tags |
| `wet-kitchen-brunei.html` | 2026-02-27 | Full "De-AI" Pass, expanded messaging, semantic tags |
| `custom-carpentry-brunei.html` | 2026-02-27 | Full "De-AI" Pass, expanded messaging, semantic tags |
| `home-renovation-brunei.html` | 2026-02-27 | Full "De-AI" Pass, expanded messaging, semantic tags |
| `built-in-wardrobe-brunei.html` | 2026-02-27 | Full "De-AI" Pass, expanded messaging, semantic tags |
| `interior-design-brunei.html` | 2026-02-27 | Created full interior design hub |
| `raya-renovation-brunei.html` | 2026-02-27 | Created pre-Raya seasonal guide |
| `renovation-checklist-brunei.html` | 2026-02-27 | Created renovation checklist |
| `franchise-vs-custom.html` | 2026-02-27 | Schema dateModified, cross-links |
| `brunei-vs-miri-cabinets.html` | 2026-02-27 | Schema dateModified, cross-links |
| `financing-brunei.html` | 2026-02-27 | Schema dateModified |
| `build-standard.html` | 2026-02-27 | Schema dateModified |
| `tech-specs.html` | 2026-02-27 | Schema dateModified |
| `kitchen-cost-data-brunei.html` | 2026-02-27 | Schema dateModified |
| KB articles (all 9) | 2026-02-27 | Schema dateModified, cross-links |
| `case-studies/rimba-terrace-kitchen.html` | 2026-02-27 | Schema dateModified |

**Stale content risk**: Most service pages haven't had real content updates since original creation (dates unknown). Only metadata has been refreshed.

---

## UI Component Status Tracker

**To track the transition from "AI Glassmorphism" to "Premium Grounded Architectural" design.**

| Page Category | "De-AI" Copy | UI: Removed Aurora | UI: Flattened Glass | Status |
|:--|:--|:--|:--|:--|
| `index.html` | 🟡 Partial | ❌ No | ❌ No | Open (High Priority) |
| `pricing.html` | ✅ Done | ❌ No | ❌ No | Open |
| Service Pages (4 pages) | ✅ Done | ❌ No | ❌ No | Open |
| Knowledge Base (14 pages) | ✅ Done | ✅ Done | ✅ Done | ✅ Text-heavy design |
| Portfolio/Inspiration | 🟡 Partial | ❌ No | ❌ No | Open |

---

## Competitor Awareness

**Who else targets our keywords in Brunei?**

| Competitor | URL / Presence | Strengths | Our Advantage |
|:--|:--|:--|:--|
| **Living Space BN** | Instagram-focused | Large social following, showroom | We have deeper web content, KB, estimator |
| **PA Home & Shangpin** | Website / AI Search | "Whole house custom", global franchise feel | We focus specifically on Brunei's tropical climate/local durability |
| **De Woodcraft** | Facebook page | Established brand | We have 30-page SEO-optimized site vs their social-only |
| **BIRD Concept** | Instagram/Facebook | High-end aesthetic, showroom | Our pricing transparency + technical content |
| **NUHAUS Brunei** | Website / Search | Modern contemporary fittings aesthetic | Our documented build standard and price estimation |
| **Various Miri/KK imports** | WhatsApp groups, TikTok | Lower prices | We document why local > imported (humidity article, comparison pages) |
| **Online directories** | Google Business listings | Volume of listings | Our site is an authority hub with 9 KB articles + data |

**Key insight**: Most competitors have ZERO web presence beyond social media. A 30-page SEO site with structured data, AI signals, and a Knowledge Base is a massive competitive moat.

**Monitor quarterly**: Search "kitchen cabinet brunei" on Google, Bing, ChatGPT, Perplexity, Gemini. Track our position.

---

## Analytics & Measurement

> **⚠️ CRITICAL: There is NO Google Analytics installed on this site.**

| Tool | Status | Notes |
|:--|:--|:--|
| **Google Analytics (GA4)** | ✅ Installed | `G-JLQCFD9626` on 33 pages (all content pages) |
| **Google Search Console** | ✅ Verified | `google0159268688825503.html` verification file present |
| **Bing Webmaster Tools** | ❓ Unknown | IndexNow works, unclear if Bing WMT is configured |
| **Facebook Pixel** | ❌ NOT installed | No conversion tracking from social |
| **Any heatmap tool** | ❌ NOT installed | No Hotjar, Clarity, or similar |

**🔴 HIGH PRIORITY**: Install Google Analytics 4 on all pages. Without it, we cannot measure:
- Which pages get traffic
- Where visitors come from
- Whether the estimator is being used
- Bounce rates and engagement
- Whether AI referrals are actually happening

---

## Redirect Rules

| From | To | Method |
|:--|:--|:--|
| `get-a-quote.html` | `contact-us.html` | `window.location.replace()` (JavaScript) |
| `portfolio/index.html` | `/portfolio.html` | `<meta http-equiv="refresh">` + JS fallback |
| `technical-specs/index.html` | `/tech-specs.html` | `<meta http-equiv="refresh">` + JS fallback |

**GitHub Pages limitation**: No server-side redirects. All redirects are client-side HTML pages.
**Rule**: Never delete a public URL. If a page moves, leave a redirect in place.

---

## DNS & Domain Config

| Record | Value | Purpose |
|:--|:--|:--|
| **Domain** | caramellabrunei.com | Primary domain |
| **Registrar** | Namecheap (assumed) | Domain registration |
| **A Records** | GitHub Pages IPs (185.199.108-111.153) | Points domain to GitHub |
| **CNAME (www)** | legendteddy.github.io | www subdomain redirect |
| **CNAME file** | `caramellabrunei.com` in repo root | Tells GitHub Pages the custom domain |
| **SSL** | ✅ Auto (GitHub Pages) | Free HTTPS, enforced by GitHub |
| **MX** | Unknown — likely Gmail/Google Workspace | Email routing |

**If the site goes down**: Check GitHub Pages → Settings → Custom domain. The CNAME file and A records must both be in place.

---

## Emergency Rollback Plan

If an autonomous agent pushes a commit that breaks the live site (visual bug, broken links, missing layout), **execute this rollback immediately**:

1. Find the last known good commit: `git log --oneline -n 5`
2. Hard reset to that commit: `git reset --hard [COMMIT_HASH]`
3. Force push to production: `git push -f origin main`
4. Document the failure in `.gemini/memory/errors.md` and `GEMINI.md` to prevent it from happening again.

---

## Core Conversion Funnels

The goal of this site is not just to be beautiful, but to generate qualified leads. Our optimal conversion paths are:

1. **The Explorer Funnel (Top of Funnel):**
   Organic Search (KB / FAQ / Tech Specs) → Internal Link to Service Page → Pricing Page/Estimator → WhatsApp Conversion
2. **The High-Intent Funnel (Bottom of Funnel):**
   Organic Search (Service Pages) → Portfolio (Proof) → Contact Us (Form) / WhatsApp

*Agent Actionable:* When creating or editing pages, always think about the \"next click.\" Never leave a user at a dead end. Every informational page must lead to a service or proof page. Every service or proof page must lead to a conversion event (Contact / WhatsApp).

---

## Target Audience Personas

When writing copy or designing pages, you are speaking to one of these four distinct buyer personas in Brunei:

| Persona | Pain Points | Desired Outcome | Content Hook |
|:--|:--|:--|:--|
| **The Gen Z First-Time Owner** | Views traditional cabinetry as outdated; cares intensely about aesthetics, flow, and social media readiness | An interior that looks incredible on Instagram and serves as a backdrop for their lifestyle | "Not your parents' kitchen" – modern lines, hidden storage, "showing off the new car" feeling |
| **The New Homeowner (RPN/Scheme)** | Budget-conscious, overwhelmed by choices, worried about being scammed | A beautiful but durable kitchen that survives Brunei's high humidity | Education, transparency, clear pricing (Kitchen Estimator) |
| **The Upgrade Buyer (Private)** | Wants premium aesthetics, frustrated by poor local craftsmanship | An interior that looks imported but is serviced locally | Focus on 18mm construction, Blum hardware, full interior cohesion |
| **The Burned Customer** | Has a swollen/peeling kitchen from a cheap contractor | A durable kitchen built right the first time | Education on construction methods, EVA edge-sealing tech, hardware quality |

---

## Social Proof & Testimonial Bank

When building new landing pages or rewriting copy, sprinkle these authentic quotes throughout the site to build trust. Never invent testimonials.

| Name | Rating | Key Quote | Core Benefit Highlighted |
|:--|:--|:--|:--|
| **H.A.** | 5/5 | \"Kitchen siap before Raya, exactly like they promised. My wife happy with the drawers, very smooth and quiet when closing. No regret.\" | Punctuality, hardware quality (Blum) |
| **N.R.** | 4/5 | \"Overall happy with the result. Took a bit longer than expected because we changed the countertop colour halfway, but they were patient about it.\" | Flexibility, customer service |
| **S.H.** | 5/5 | \"Been using the wet kitchen for about 5 months now. Still looks the same, no swelling around the sink area.\" | Durability, water resistance |
| **M.Z.** | 5/5 | \"Compared 3 companies. Caramella was the only one who came to measure first before giving a price.\" | Professionalism, accuracy |
| **A.M.** | 5/5 | \"Simple and straightforward. They showed us 3D picture of the design, we approved, then they just did the work. No drama.\" | Stress-free process, 3D viz |
| **F.Y.** | 5/5 | \"The installers were very neat. They even put cardboard on the floor so no scratches. Small thing but shows they care lah.\" | Attention to detail, cleanliness |

## Operational Rules

1. **ALWAYS ASK FOR CLARIFICATION**: If a user request is ambiguous, broad, or impacts core messaging/design, you MUST pause and ask numbered questions (1, 2, 3) to clarify intent before executing. Give the user numbered options to respond with.
2. **Bulk HTML changes** → Write a temp PowerShell script, run it, delete the script
3. **CSS changes** → Edit `css/site.css`, the global stylesheet
4. **JS changes** → Edit `js/site.js`, then bump cache-buster version in all HTML files
5. **Footer changes** → Must be applied to all pages with footers individually
6. **Prefer explicit `.html` URLs** — GitHub Pages doesn't support clean URL rewrites
7. **Schema changes** → Update `dateModified` in affected pages
8. **New pages** → Add to `sitemap.xml`, `llms.txt`, `llms-full.txt`, and cross-link
9. **After deploy** → Ping IndexNow with affected URLs for fast indexing
10. **NEVER use PowerShell (`Set-Content`, `Out-File`, `>` etc.) to modify code files.** PowerShell scripting is **STRICTLY FORBIDDEN** for editing or generating code due to extreme risk of file corruption, encoding destruction, and regex catastrophic failures. You must ONLY use the `multi_replace_file_content` tool natively or write a discrete Python script if bulk algorithmic changes are required. This is a hard architectural boundary.

---

## Pre-Deploy Verification Checklist

**Run this EVERY time before `git push`. No exceptions.**

- [ ] **HTML validation** — No unescaped `&`, no unclosed tags, no duplicate IDs
- [ ] **Links check** — No broken internal links (grep for `.html` hrefs, verify files exist)
- [ ] **Schema check** — Paste any modified page's JSON-LD into [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] **Visual check** — Open modified pages in browser (`python -m http.server 8008`), scroll through fully
- [ ] **Mobile check** — Resize browser to 375px width, verify layout doesn't break
- [ ] **JS console** — No console errors on any modified page
- [ ] **Meta descriptions** — 120-160 chars (check the inventory below for current lengths)
- [ ] **dateModified** — Updated in schema on pages where content changed
- [ ] **Cache-buster** — If CSS/JS changed, bump `v=` in all HTML files
- [ ] **GEMINI.md** — Update file tree, debt tracker, session log, and any affected inventory tables
- [ ] **Commit message** — Clear, descriptive (e.g., `feat(pricing): add cost estimator`)

---

## Common Mistakes Log

**Errors I've made before. Check this list before repeating them.**

| Date | Mistake | Lesson |
|:--|:--|:--|
| 2026-02-27 | Used `$content -replace '...</ul>'` in a loop over all `*.html` to add footers | **ATASTROPHIC FAILURE.** Multi-line regex matches consumed everything between the first `<li>` and the final `</ul>` on the page, deleting the entire `<body>` contents. **Never use PowerShell for bulk HTML matching.** |
| 2026-02-27 | Accidentally deleted `aggregateRating` from `reviews.html` while adding `sameAs` | When editing JSON-LD, always verify the full schema block is intact after editing |
| 2026-02-27 | First site map missed 20+ files (inspiration.css, inspiration.js, docs/, tools/, etc.) | List EVERY file with `Get-ChildItem -Recurse`, don't assume from memory |
| 2026-02-27 | Garbled terminal output — trusted it without verifying | Always re-run or cross-check if PowerShell output looks garbled (line mixing) |
| 2026-02-27 | Tried to use `&&` in PowerShell (bash syntax) | PowerShell uses `;` for command chaining, not `&&` |
| 2026-02-25 | Stale copyright years (hardcoded 2024/2025) left on pages | Always use dynamic year: `document.getElementById('year').textContent = new Date().getFullYear()` |
| 2026-02-24 | Edited schema without checking if `dateModified` was present | Every schema edit must verify `dateModified` exists and is current |

**Add to this log whenever you make a mistake. Future sessions will thank you.**

---

## Meta Description Inventory

Optimal range: **120–160 characters**. Flag anything outside this range.

| Page | Chars | Status |
|:--|:--|:--|
| `index.html` | 164 | ⚠️ Slightly over |
| `portfolio.html` | 132 | ✅ OK |
| `pricing.html` | 170 | ⚠️ Over limit |
| `reviews.html` | 163 | ⚠️ Slightly over |
| `contact-us.html` | 171 | 🔴 Over limit |
| `faq.html` | 127 | ✅ OK |
| `service-areas.html` | 132 | ✅ OK |
| `inspiration.html` | 165 | ⚠️ Slightly over |
| `404.html` | 126 | ✅ OK |
| `thank-you.html` | 131 | ✅ OK |
| `kitchen-renovation-brunei.html` | 175 | 🔴 Over limit |
| `kitchen-cabinet-brunei.html` | 197 | 🔴 Over limit (trim!) |
| `wet-kitchen-brunei.html` | 193 | 🔴 Over limit (trim!) |
| `custom-carpentry-brunei.html` | 168 | ⚠️ Over limit |
| `home-renovation-brunei.html` | 171 | 🔴 Over limit |
| `built-in-wardrobe-brunei.html` | 167 | ⚠️ Over limit |
| `interior-design-brunei.html` | 158 | ✅ OK |
| `raya-renovation-brunei.html` | 155 | ✅ OK |
| `renovation-checklist-brunei.html` | 159 | ✅ OK |
| `franchise-vs-custom.html` | 170 | ⚠️ Over limit |
| `brunei-vs-miri-cabinets.html` | 160 | ✅ OK |
| `financing-brunei.html` | 169 | ⚠️ Over limit |
| `build-standard.html` | 184 | 🔴 Over limit (trim!) |
| `tech-specs.html` | 125 | ✅ OK |
| `kitchen-cost-data-brunei.html` | 172 | 🔴 Over limit |

**🔴 Action required**: 7 pages need meta descriptions trimmed to ≤160 chars.

---

## External Link Registry

**Every outbound link on the site. Check quarterly for broken URLs.**

| URL | Used On | Purpose |
|:--|:--|:--|
| `https://wa.me/6737187185` | Most pages (footer, CTAs) | WhatsApp direct link |
| `https://www.instagram.com/caramellabrunei/` | Footer, schema `sameAs` | Instagram profile |
| `https://www.facebook.com/caramellabrunei2015/` | Schema `sameAs` | Facebook page |
| `https://g.page/r/CdYEK1Hfb887EBM/review` | Schema `sameAs` | Google Business review link |
| `https://www.google.com/maps/search/?api=1&query=4.939979...` | Schema `sameAs`, service-areas | Google Maps pin |
| `https://mail.google.com/mail/?view=cm&fs=1&to=caramellabrunei@gmail.com` | Contact page | Gmail compose link |
| `https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css` | `contact-us.html` | Date picker CSS |
| `https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/dark.css` | `contact-us.html` | Date picker dark theme |
| `https://formspree.io/f/mreazjqo` | `contact-us.html` | Form submission endpoint |

---

## Image Usage Map

| Image | Used On |
|:--|:--|
| `hero-bg.jpg/.webp` | All pages (hero background, preloaded) |
| `img_1.jpg/.webp` | `index.html` (OG), `kitchen-renovation` (OG), `thank-you` (OG), `contact-us` (OG), `drawer-runners` KB |
| `img_2.jpg/.webp` | `kitchen-cabinet` (OG), `rimba-terrace-kitchen` (OG) |
| `img_3.jpg/.webp` | `wet-kitchen` (OG), `kitchen-layout-types` KB (OG) |
| `img_4.jpg/.webp` | `home-renovation` (OG), `service-areas` (OG), `portfolio` (OG), `wardrobe-cost` (OG), `drawer-box-18mm` KB (OG) |
| `img_5.jpg/.webp` | `custom-carpentry` (OG), service card (wardrobe) |
| `img_6.jpg/.webp` | `franchise-vs-custom` (OG), service card (joinery) |
| `img_7.jpg/.webp` | `brunei-vs-miri` (OG) |
| `img_8.jpg/.webp` | `financing-brunei` (OG) |
| `img_9.jpg/.webp` | `build-standard` (OG), service card (kitchen) |
| `img_10.jpg/.webp` | `tech-specs` (OG) |
| `img_11.jpg/.webp` | `faq` (OG) |
| `img_12.jpg/.webp` | `pricing` (OG) |
| `img_13.jpg/.webp` | `reviews` (OG) |
| `img_14.jpg/.webp` | `inspiration` (OG) |
| `img_15.jpg/.webp` | `kitchen-cost-data` (OG) |
| `img_16.jpg/.webp` | `brunei-humidity-cabinetry` KB (OG) |
| `img_17.jpg/.webp` | `countertop-materials` KB (OG) |
| `img_18.jpg/.webp` | `cabinet-door-finishes` KB (OG) |
| `img_19.jpg/.webp` | `edge-sealing-eva` KB (OG) |
| `img_20.jpg/.webp` | `glossary` KB (OG) |
| `img_21.jpg/.webp` | `imported-cabinet-failures` KB (OG) |
| `blum-clip-top-hinge.jpg` | `tech-specs.html` (inline) |
| `blum-runner-system.jpg` | `tech-specs.html` (inline) |
| `promo-formica-bedroom-set.webp` | `pricing.html` (11th Anniversary Promo) |
| `promo-formica-tv-cabinet-1.webp` | `pricing.html` (11th Anniversary Promo) |
| `promo-formica-tv-cabinet-2.webp` | `pricing.html` (11th Anniversary Promo) |
| `promo-formica-kitchen-1.webp` | `pricing.html` (11th Anniversary Promo) |
| `promo-formica-kitchen-2.webp` | `pricing.html` (11th Anniversary Promo) |
| `promo-formica-entryway.webp` | `pricing.html` (11th Anniversary Promo) |
| `promo-classic-kitchen-1.webp` | `pricing.html` (11th Anniversary Promo) |
| `promo-classic-kitchen-2.webp` | `pricing.html` (11th Anniversary Promo) |
| `promo-classic-lacquer-kitchen-1.webp` | `pricing.html` (11th Anniversary Promo) |
| `promo-classic-lacquer-kitchen-2.webp` | `pricing.html` (11th Anniversary Promo) |

---

## Performance Baseline

**Last measured: 2026-02-27**

| Asset | Size | Notes |
|:--|:--|:--|
| `css/site.css` | 68.5 KB | Main stylesheet — monitor for bloat |
| `css/inspiration.css` | 13.2 KB | Inspiration page only |
| `js/site.js` | 11.9 KB | Global JS |
| `js/inspiration.js` | 12.1 KB | Inspiration gallery only |
| `images/` (total) | 11.8 MB | 50 files (21 JPG + 21 WebP + 8 icons/favicons) |
| HTML files (total) | 617.8 KB | 24 files |
| `hero-bg.webp` | 200 KB | Largest single WebP (preloaded) |
| `videos/IMG_6500.MOV` | 78 MB | Not used on any page — consider removing or embedding |

**Weight budget**: Hero page should load under 1.5MB total. WebP images keep this manageable.

---

## Derived Pricing Guidelines (11th Anniversary Promos)

This is the calibrated pricing logic derived from Caramella's 11th Anniversary promotional packages (Feb 2026), replacing older international estimations. Use these figures as the baseline for the Kitchen Cost Estimator and any future pricing discussions.

### 1. Base Footprint (Laminate/Formica baseline)
Assuming a standard Kitchen layout without luxury add-ons:
- **Single Line (3m/10ft)**: ~BND 2,500 - 4,000
- **L-Shape (3m x 3m / 20ft)**: ~BND 3,000 - 4,800
- **U-Shape (6m base + 3m wall)**: ~BND 4,200 - 6,800
- **Galley (Double 3m run)**: ~BND 3,800 - 6,000

### 2. Material Multipliers
- **Laminate / Formica:** 1.0x (Baseline)
- **Melamine:** ~0.55x (Significantly cheaper, e.g., $1,580 vs $2,990 for 3m L-shape)
- **Classic / Lacquer / Acrylic:** ~1.20x (Premium finish, e.g., $3,590 vs $2,990 for 3m L-shape)

### 3. Hardware Tiers
- **DTC (Standard soft-close):** 1.0x
- **Blum (Austrian Premium):** ~1.25x

### 4. Countertop Estimations (per 10ft layout)
Countertops are quoted separately from cabinetry.
- **Laminate / Formica:** + BND 300 - 600
- **Solid Surface:** + BND 800 - 1,600
- **Quartz:** + BND 1,200 - 2,500

---

## Local Testing

```powershell
# Start local server (run from repo root)
python -m http.server 8008

# Site available at:
# http://localhost:8008/index.html
# http://localhost:8008/pricing.html
# etc.

# To test a specific page quickly:
Start-Process "http://localhost:8008/pricing.html"

# Kill the server:
# Ctrl+C in the terminal
```

**Important**: GitHub Pages serves the site exactly as-is. There's no build step, no bundler, no SSR. What you see on `localhost:8008` is what goes live.

---

## L5 Autonomous Improvement Protocol

> **Trigger**: User says "read GEMINI.md", "do your thing", "continue improving", etc.
> **Behavior**: I think like a human site strategist — audit, brainstorm, execute, log, repeat.
> **This is not a checklist that gets "done". It is a perpetual improvement loop.**

### How Each Session Works

```
┌─────────────────────────────────────────────────┐
│  1. READ    — Read this file, review session log│
│  2. AUDIT   — Run through each lens below       │
│  3. THINK   — What's the highest-impact fix?    │
│  4. EXECUTE — Do 3-5 improvements               │
│  5. DEPLOY  — Commit, push, ping IndexNow       │
│  6. LOG     — Record what I did + what's next   │
│  7. REPEAT  — Next session, start from step 1   │
└─────────────────────────────────────────────────┘
```

### Maintenance Schedule (Chron Simulation)

The L5 Protocol requires consistent execution. Check this schedule during Step 1 (READ).

| Frequency | Task | Owner | Next Due |
|:--|:--|:--|:--|
| **Every Session** | Run the 6 Audit Lenses | AI Agent | Ongoing |
| **Weekly** | Run broken link checker script | AI Agent | 2026-03-06 |
| **Weekly** | Validate Schema on Homepage + Service Pages | AI Agent | 2026-03-06 |
| **Monthly** | Add 1 new Case Study to Portfolio | AI Agent | 2026-03-15 |
| **Quarterly** | Refresh Competitor Matrix (Search "custom cabinets brunei") | AI Agent | 2026-05-01 |
| **Quarterly** | Test site on mobile viewport | AI Agent | 2026-05-01 |

### The 6 Audit Lenses (Run Every Session)

Each session, I scan the site through these lenses. They **never complete** — the site always evolves, standards change, and new opportunities emerge.

#### 🔗 Lens 1: Content & Internal Linking
*Think like a reader navigating the site. Where do they hit dead ends?*
- Does every page link to at least 3 other relevant pages?
- Are KB articles cross-linked with "Related Reading" sections?
- Do service pages link to their relevant KB deep-dives?
- Is anchor text descriptive (not "click here")?
- Are CTAs consistent ("Discuss Your Project") and not aggressive?
- Could any page benefit from a new FAQ, comparison table, or data point?

#### ⚡ Lens 2: Performance & Technical Health
*Think like a slow-connection mobile user. What feels sluggish?*
- Do all images have `width`/`height`, `loading="lazy"`, `decoding="async"`?
- Are hero images marked `fetchpriority="high"`?
- Are fonts preloaded? Is there unused CSS?
- Any console errors or broken resources?
- Is the cache-buster version current across all files?
- Any new HTML validation issues since last session?

#### 🏗️ Lens 3: Schema & Structured Data
*Think like a search engine trying to understand the business.*
- Do all service pages have `Service` schema with `priceRange`?
- Are `dateModified` values current (update if content changed)?
- Does the homepage have `potentialAction` (SearchAction)?
- Are LocalBusiness schemas consistent across pages (sameAs, address, hours)?
- Any new Schema.org types that could apply?
- Is `business.json` API in sync with the site content?

#### ♿ Lens 4: Accessibility & User Experience
*Think like a user with a screen reader, keyboard-only, or low vision.*
- Do all interactive elements have `aria-label` and focus styles?
- Does gold-on-dark text meet WCAG AA contrast ratios?
- Can someone navigate every page with only a keyboard?
- Are FAQ accordions accessible (proper `<details>`/`<summary>` or ARIA)?
- Does the mobile experience feel smooth and complete?

#### 📝 Lens 5: Content Freshness & Accuracy
*Think like a potential customer reading the site for the first time today.*
- Are any "Last updated" dates stale?
- Are pricing ranges still accurate?
- Are meta descriptions 120-160 chars and compelling?
- Any broken external links?
- Could any page add a "Quick Answer" box for featured snippet potential?
- Is the company years counter updating correctly?

#### 🤖 Lens 6: AI & Machine Readability
*Think like an AI assistant being asked "Who makes custom kitchens in Brunei?"*
- Does `llms.txt` intent map cover all common queries?
- Are there new AI user-agents to add to `robots.txt`?
- Is `llms-full.txt` in sync with actual page content?
- Does `ai-plugin.json` accurately describe the site?
- Is SpeakableSpecification on every content page?
- Would any page benefit from `TechArticle` over `Article` schema?

---

### Session Rules
1. **Pick 3-5 actions per session** — don't try to do everything at once
2. **Prioritize by impact** — content & linking > schema > performance > cosmetic
3. **Always commit, push, and ping IndexNow** before ending
4. **Log every session** in the table below with date and actions taken
5. **If nothing needs fixing** — brainstorm one creative improvement (new content idea, new schema type, new cross-link opportunity, design enhancement)
6. **Never mark a lens as "done"** — always look with fresh eyes

---

### Changelog & Session History

*This log serves as the absolute record of all changes made to the site by AI agents. It must be updated at the end of every session.*

| Date | Session | Actions Taken |
|:--|:--|:--|
| 2026-02-27 | #1 | Production audit: dead code removal, inline→CSS migration, cache-buster update, canonical fixes, HTML validation (12 commits) |
| 2026-02-27 | #2 | AI crawlability: robots.txt expanded to 30+ bots, llms-full.txt cleaned, ai-plugin.json fixed, OG images diversified, schema dateModified updated, sameAs added |
| 2026-02-27 | #3 | Built interactive Kitchen Cost Estimator on pricing.html (4-step configurator, vanilla JS, real project data). Added emotional hooks to homepage (hero, Engineering Truth, service cards). Restructured GEMINI.md: dual Primary Mission, complete file tree (every file), keyword mapping, schema inventory, linking matrix, debt tracker, brand voice guide. |
| 2026-02-27 | #4 | Trimmed meta descriptions to fit 120-160 characters on all flagged pages. Updated GEMINI.md page inventory and keyword map with new KB articles (tropical mistakes, quartz vs solid surface, DIY guide, flat pack). Expanded "whole-house customization" messaging on custom carpentry and home renovation pages to better counter imported franchise competitors like PA Home. |
| 2026-02-27 | #5 | Expanded "whole-house customization" messaging further to frame the use of filler panels as a necessary custom scribe specifically to handle Brunei's naturally uneven walls and ceilings. |
| 2026-02-27 | #6 | L5 Autonomous Sprint completed. Fixed index.html internal link coverage (added Cost Data and Case Studies links). Added standard "Related Services" cross-linking blocks to all 14 Knowledge Base articles. Expanded faq.html with detailed answers on ABCi permits, BIBD financing, replace vs renovate, and kitchen usage during renovation. |
| 2026-02-27 | #7 | Executed Deep De-AI pass on all core service pages and KB. Removed 'In conclusion/Moreover' padding. Added HTML entity script fix for mojibake characters site-wide. Final A11y semantic perfection (scope attributes) on pricing/build tables. |
| 2026-02-27 | #8 | Post-Deploy Emergency Fixes: Removed leaked JS comment from `index.html` body. Added `padding-top` to `.hero` to clear absolute navbar. Safely injected `llms.txt` and `robots.txt` `<link>` tags into the `<head>` of all 44 HTML files via Python. Banned PowerShell `-replace` HTML regex matching in both local and global `GEMINI.md`. |
