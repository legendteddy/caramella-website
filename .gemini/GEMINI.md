# GEMINI.md — Caramella Website Project Context

> Project-specific instructions and context for the Caramella Brunei website.

---

## Project Overview

**Site**: [caramellabrunei.com](https://caramellabrunei.com)  
**Business**: Custom kitchen cabinets & wardrobes in Brunei  
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
| `wardrobe-cost-brunei.html` | Wardrobe pricing guide |
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

## Design System

**Theme**: Dark luxury, glassmorphism  
**Accent**: Gold `#FFD700` / warm gold `#f4d77a`  
**Brand font**: Inter (Google Fonts)  
**Card style**: `var(--panel)` background, `var(--panel-border)` border, 18px radius, backdrop-filter blur

### Button Classes
- `.btn-primary` — Glass morphism, gold text, subtle border (primary CTA)
- `.btn-luxury` / `.btn-secondary` — Dimmer glass style (secondary action)
- Both are sentence-case, NOT uppercase. No aggressive styling.

### Brand Tone
- **Premium, confident, understated** — NOT hard-sell
- CTA text uses invitational language: "Discuss Your Project" not "Get a Quote"
- User explicitly dislikes: screaming, desperate, aggressive, hard-sales language

---

## Schema Types Used

The site uses 12 distinct Schema.org types:
1. `LocalBusiness` — index, reviews
2. `WebPage` — all pages
3. `SpeakableSpecification` — all content pages
4. `BreadcrumbList` — all pages
5. `FAQPage` — faq, portfolio, brunei-vs-miri, imported-cabinet-failures, wet-kitchen
6. `HowTo` — index (process steps)
7. `Article` / `TechArticle` — KB articles, comparison pages
8. `Review` + `AggregateRating` — reviews (with `datePublished`)
9. `Dataset` — kitchen-cost-data-brunei
10. `DefinedTermSet` — glossary
11. `Product` — tech-specs
12. `Service` — service pages

All pages have `dateModified` in schema. Update when content changes.

---

## Dynamic Features

### Company Age (`initCompanyAge()`)
- Calculates years since Jan 11, 2015
- `.company-years` → shows "11+" (updates automatically each year)
- `.company-years-text` → shows "11+ years"
- Applied on: `index.html`, `reviews.html`, `wet-kitchen-brunei.html`, `pricing.html`

### Cache Busting
- JS loaded as `site.js?v=YYYYMMDD[letter]`
- Current version: `v=20260224b`
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

## Operational Rules

1. **Bulk HTML changes** → Write a temp PowerShell script, run it, delete the script
2. **CSS changes** → Edit `css/site.css`, the global stylesheet
3. **JS changes** → Edit `js/site.js`, then bump cache-buster version in all HTML files
4. **Footer changes** → Must be applied to all pages with footers individually
5. **Prefer explicit `.html` URLs** — GitHub Pages doesn't support clean URL rewrites
6. **Schema changes** → Update `dateModified` in affected pages
7. **New pages** → Add to `sitemap.xml`, `llms.txt`, `llms-full.txt`, and cross-link
8. **After deploy** → Ping IndexNow with affected URLs for fast indexing
