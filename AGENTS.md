# Repository Guidelines

## Project Structure

This is a static website (HTML/CSS/vanilla JS). There is no framework and no build step.

- Pages: root HTML files like `index.html`, `portfolio.html`, `inspiration.html`, `faq.html`, `tech-specs.html`, `contact-us.html`, `404.html`
- Shared styles: `css/site.css` (theme tokens, components, responsive rules)
- Shared scripts: `js/site.js` (progressive enhancement, global effects)
- Assets: `images/` (JPG + WebP variants, icons)
- SEO/deploy files: `robots.txt`, `sitemap.xml`, `manifest.json`, `_redirects`, `CNAME`
- Tools/docs: `tools/` (repo checks), `docs/` (guides and reports)

Some sections also have folder entrypoints like `portfolio/index.html` that redirect to canonical root pages.

## Development Commands

Run locally with a static server (avoid `file://`):

```powershell
python -m http.server 5173
```

Open `http://localhost:5173/`.

Site audit (links/assets/meta/schema sanity):

```powershell
python tools/audit_site.py
```

## Coding Style

- HTML/CSS indentation: 4 spaces, no tabs (match existing files).
- Prefer editing shared styles in `css/site.css` over adding new per-page `<style>` blocks.
- Keep copy modern and direct; avoid “boutique” and “private”, use “premium”.
- SEO: keep `<link rel="canonical">`, `og:url`, and JSON-LD URLs consistent with the live domain.

## Testing Checklist

- Desktop + mobile: navbar, hero, cards, FAQ/KB expanders, lightbox, footer.
- Performance: images should use WebP where available; avoid huge new assets.
- SEO: title/description present, canonical correct, JSON-LD parses, page appears in `sitemap.xml`.

## Commits & PRs

- Commits: short, imperative messages (`Fix ...`, `Add ...`, `Unify ...`, `Restore ...`).
- PRs (if used): describe affected pages and include screenshots for desktop + mobile; call out any schema/SEO changes.

## Security

Do not commit secrets (API keys, personal access tokens).
