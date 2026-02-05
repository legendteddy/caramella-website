# Repository Guidelines

## Project Structure & Module Organization

This repository is a static website (no framework, no build step).

- Pages: root-level HTML files like `index.html`, `portfolio.html`, `inspiration.html`, `faq.html`, `tech-specs.html`, `contact-us.html`, `404.html`
- Shared styles: `css/site.css` (global theme tokens, navbar, buttons, responsive rules)
- Shared scripts: `js/site.js` (progressive enhancement, global effects)
- Assets: `images/`
- Deployment/SEO: `CNAME`, `robots.txt`, `sitemap.xml`, `manifest.json`, `_redirects`
- Supporting docs: `docs/`, `DEPLOYMENT_GUIDE.md`, `SEO_Audit_Report.md`

There are also section folders like `portfolio/`, `knowledge-base/`, and `technical-specs/` that contain small `index.html` entrypoints.

## Build, Test, and Development Commands

No build tooling is required. Use a local static server (avoid `file://` because relative paths and fetches can behave differently).

```powershell
python -m http.server 5173
```

Then open `http://localhost:5173/`.

## Coding Style & Naming Conventions

- Indentation: 4 spaces, no tabs (match existing HTML/CSS).
- CSS: prefer tokens in `:root` and reuse existing utilities/components in `css/site.css`.
- Naming: kebab-case for classes and files (`contact-us.html`, `.lang-switch`).
- SEO: keep JSON-LD blocks valid JSON and aligned with page content (title/description/canonical URL).

## Testing Guidelines

There are no unit tests in this repo. Validate changes with:

- Visual checks: desktop + mobile widths (including small screens)
- Basic regression scan: navigation, hero, FAQ/KB expanders, portfolio cards
- SEO sanity: page titles/descriptions, canonical tags, JSON-LD validity (Structured Data testing tools)

## Commit & Pull Request Guidelines

Commit messages follow a short, imperative pattern: `Add …`, `Fix …`, `Unify …`, `Restore …`, `Refine …`.

For PRs:

- Describe the user-facing change and which pages are affected.
- Include screenshots for key breakpoints (desktop and mobile).
- Call out any SEO/schema changes explicitly.

## Security & Configuration Tips

Do not commit secrets (API keys, personal tokens). Keep external embeds (maps, analytics) configuration-only and review any third-party scripts for privacy and performance impact.
