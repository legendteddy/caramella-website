# Repository Guidelines

## Project Context (Handoff Notes)

Caramella Brunei is a premium cabinetry/joinery brand. This repo is the production website for
`https://caramellabrunei.com/` (non-`www` is canonical). The site is intentionally "luxury" in feel:
cinematic gradients, glassmorphism, and modern, punchy copy. Avoid outdated positioning words like
"boutique" and avoid "private"; use "premium" instead.

Key user preferences that should not regress:
- Background gradients should feel present throughout scroll, but remain centered and not distract readability.
- Avoid purple/magenta cast in gradients (user complained about purple).
- Typography consistency matters (navbar/footer/hero should not change fonts page-to-page).
- Avoid clipped/cropped hero/title typography (italic/gradient effects previously caused clipping).
- Mobile layout must be clean on small screens (user tested on Poco F7).

Operational expectations:
- Keep the site unbroken. Validate with `python tools/audit_site.py` before pushing.
- Changes are typically committed and pushed directly to `main`.

Technical facts provided by the user (used in copy/FAQ):
- Edge sealing: EVA adhesive around ~190C on a fully automatic edge banding machine.
- Kitchen drawer slides: Blum TANDEM runner and DTC runners (exact load rating depends on DTC series).
- Drawer box: 18mm, pocket-screw joint.
- Wardrobes: DTC side runner (user initially mentioned OEM 3-joint, later clarified DTC too).

## Project Structure

This is a static website (HTML/CSS/vanilla JS). There is no framework and no build step.

- Pages: root HTML files like `index.html`, `portfolio.html`, `inspiration.html`, `faq.html`, `tech-specs.html`, `contact-us.html`, `404.html`
- Shared styles: `css/site.css` (theme tokens, components, responsive rules)
- Shared scripts: `js/site.js` (progressive enhancement, global effects)
- Assets: `images/` (JPG + WebP variants, icons)
- SEO/deploy files: `robots.txt`, `sitemap.xml`, `manifest.json`, `_redirects`, `CNAME`
- Tools/docs: `tools/` (repo checks), `docs/` (guides and reports)

Some sections also have folder entrypoints like `portfolio/index.html` that redirect to canonical root pages.

## Hosting / Deployment Notes

The repo is ready for static hosting (no build). Netlify can host it using `netlify.toml`.

Important domain rules (do not break):
- Canonical host is `https://caramellabrunei.com` (non-`www`).
- `_redirects` includes a forced redirect from `www` to non-`www`.
- `/pricing` redirects to `/kitchen-renovation-brunei.html`.

If using Netlify with "External DNS", do NOT switch nameservers to Netlify DNS unless explicitly requested.

### Domain Setup Notes

This repo is compatible with Netlify + "External DNS" (keep DNS at your current provider; do not switch nameservers).
Netlify will show the exact DNS records required in its domain management UI. Typical records look like:

| Purpose | Type | Host | Value |
|--------|------|------|-------|
| Apex/root | A or ALIAS | `@` | Netlify-provided apex target/IPs |
| WWW | CNAME | `www` | your `*.netlify.app` hostname |

After DNS is correct, Netlify provisions SSL automatically.

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
- Keep copy modern and direct; avoid "boutique" and "private", use "premium".
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
