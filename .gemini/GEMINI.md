# GEMINI.md — Caramella Website Project Context

> Project-specific instructions and context for the Caramella Brunei website.

---

## Project Overview

**Site**: [caramellabrunei.com](https://caramellabrunei.com)  
**Business**: Custom kitchen cabinets & wardrobes in Brunei  
**Founded**: January 11, 2015  
**Stack**: Static HTML/CSS/JS, hosted on GitHub Pages, repo on GitHub  
**Repo**: `legendteddy/caramella-website`  
**Deploy**: `git push origin main` → GitHub Pages auto-deploys  
**Forms**: Formspree (`formspree.io/f/mreazjqo`) — NOT Netlify Forms

---

## Site Architecture

| Page | Purpose |
|:--|:--|
| `index.html` | Homepage — hero, services, testimonials, trust stats |
| `portfolio.html` | Project showcase + FAQ section |
| `pricing.html` | Pricing guide, process overview |
| `reviews.html` | Customer testimonials + stats strip |
| `contact-us.html` | Contact form (Formspree) |
| `faq.html` | Knowledge base / FAQ |
| `service-areas.html` | BSB, KB, Tutong, Muara coverage |
| `kitchen-renovation-brunei.html` | Kitchen renovation landing page |
| `wet-kitchen-brunei.html` | Wet kitchen specialization page |
| `wardrobe-cost-brunei.html` | Wardrobe pricing guide |
| `franchise-vs-custom.html` | Imported vs locally-made comparison |
| `financing-brunei.html` | BIBD At-Tamwil financing info |
| `build-standard.html` | Build quality / materials page |
| `tech-specs.html` | Technical specifications |
| `inspiration.html` | Design inspiration gallery |
| `case-studies/rimba-terrace-kitchen.html` | Case study |
| `knowledge-base/*.html` | Technical articles (humidity, drawer runners, etc.) |
| `404.html` | Custom error page |

### Shared Assets
- `css/site.css` — Global stylesheet (design system, dark theme, glassmorphism)
- `js/site.js` — Global JS (navbar, scroll effects, company age calculator)
- Footer is in each HTML file (not a shared include)

---

## Design System

**Theme**: Dark luxury, glassmorphism  
**Accent**: Gold `#FFD700` / warm gold `#f4d77a`  
**Brand font**: Inter (Google Fonts)  
**Card style**: `var(--panel)` background, `var(--panel-border)` border, 18px radius, backdrop-filter blur

### Button Classes
- `.btn-primary` — Glass morphism, gold text, subtle border (primary CTA)
- `.btn-luxury` — Similar glass style but dimmer (secondary action)
- Both are sentence-case, NOT uppercase. No aggressive styling.

### Brand Tone
- **Premium, confident, understated** — NOT hard-sell
- CTA text uses invitational language: "Discuss Your Project" not "Get a Quote"
- User explicitly dislikes: screaming, desperate, aggressive, hard-sales language

---

## Dynamic Features

### Company Age (`initCompanyAge()`)
- Calculates years since Jan 11, 2015
- `.company-years` → shows "11+" (updates automatically each year)
- `.company-years-text` → shows "11+ years"
- Applied on: `index.html`, `reviews.html`, `wet-kitchen-brunei.html`, `pricing.html`

### Cache Busting
- JS loaded as `site.js?v=YYYYMMDD[letter]`
- Current version: `v=20260212c`
- When updating JS, bump the version in ALL HTML files (use PowerShell bulk script)

---

## Footer Structure

Standard footer on 20 pages (3-column grid):
1. **Service Areas**: BSB, Kuala Belait & Seria, Tutong, Muara, Airport Mall (Showroom)
2. **Contact**: Phone (+673 718 7185), Email (caramellabrunei@gmail.com)
3. **Navigate**: Home, Portfolio, Pricing, Knowledge Base, Tech Specs

**Exception**: `index.html` has no standard footer (separate bottom layout).

---

## Deployment Notes

- **Host**: GitHub Pages (auto-deploy from GitHub `main` branch)
- **Domain**: `caramellabrunei.com` via `CNAME` file
- **DNS**: Namecheap → GitHub Pages A records + www CNAME
- **No `_redirects` support** — GitHub Pages ignores Netlify-style redirects. Use explicit `.html` URLs.
- **Legacy files**: `netlify.toml` and `_redirects` remain from old Netlify attempt (unused)
- **Forms**: Formspree (`formspree.io/f/mreazjqo`) handles `contact-us.html` submissions

---

## SEO / Schema

- All pages have JSON-LD structured data
- `dateModified` in schema should be updated when content changes
- `robots.txt` is maximally permissive for AI bots
- Canonical URLs use `https://caramellabrunei.com/`

---

## Operational Rules

1. **Bulk HTML changes** → Write a temp PowerShell script, run it, delete the script
2. **CSS changes** → Edit `css/site.css`, the global stylesheet
3. **JS changes** → Edit `js/site.js`, then bump cache-buster version in all HTML files
4. **Footer changes** → Must be applied to all 20 pages with footers individually
5. **Prefer explicit `.html` URLs** — GitHub Pages doesn't support clean URL rewrites
