# Release Checklist (Static Site)

Use this when shipping changes to production hosting (Netlify / GitHub Pages / Namecheap).

## Content and UX

- Open each core page: `index.html`, `portfolio.html`, `inspiration.html`, `faq.html`, `tech-specs.html`, `contact-us.html`.
- Mobile spot check at ~360px width (small Android): navbar, hero titles, FAQ cards, forms, galleries.
- Verify lightbox opens/closes and the page does not "jump" after closing.

## SEO

- Confirm each core page has: unique `<title>`, meta description, canonical, and `og:title`.
- Validate JSON-LD blocks did not drift from real business info (phone, address, hours).
- If content changed, update `sitemap.xml` `lastmod`.

## Performance

- Ensure images are lazy-loaded where possible and have explicit `width` and `height`.
- Prefer WebP assets for galleries; keep JPG fallbacks.

## Automation

Run:

```powershell
python tools/audit_site.py
```

This checks for missing local assets, missing `alt`, and basic SEO meta presence.

