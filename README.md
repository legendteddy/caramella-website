# Caramella Website

Static website for Caramella Trading Co. (Brunei), built with plain HTML/CSS/vanilla JS.

Production domain: `https://caramellabrunei.com/` (hosted on GitHub Pages).

## Local Development

Serve the folder with a local static server (avoid `file://` for consistent behavior):

```powershell
python -m http.server 5173
```

Then open `http://localhost:5173/`.

## Key Paths

- Pages: `index.html`, `portfolio.html`, `inspiration.html`, `faq.html`, `tech-specs.html`, `contact-us.html`
- Official inquiry form URL: `contact-us.html` (avoid creating multiple form endpoints)
- Shared CSS: `css/site.css`
- Shared JS: `js/site.js`
- Images: `images/`
- SEO/Deployment: `robots.txt`, `sitemap.xml`, `manifest.json`, `CNAME`

## Docs

- Deployment options: `docs/guides/deployment.md`
- Google Search Console steps: `docs/guides/google-search-console.md`
- SEO snapshot report: `docs/reports/seo-audit.md`
- Release checklist: `docs/guides/release-checklist.md`

## Contributing

See `AGENTS.md` for repo conventions and review expectations.

## Quick Audit

```powershell
python tools/audit_site.py
```
