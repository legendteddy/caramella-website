# GitHub Pages Setup (Plain-English Handover)

This repo is a static site (no build step). Production hosting is **GitHub Pages** and the live domain is:

- `https://caramellabrunei.com/`

## What “done” looks like

- `https://caramellabrunei.com/` loads over HTTPS.
- `https://www.caramellabrunei.com/` loads over HTTPS (redirect is optional; not required for Pages to work).
- GitHub repo `Settings -> Pages` shows the custom domain as verified (no DNS warning).

## Current DNS (Namecheap) for GitHub Pages

At Namecheap `Advanced DNS`, you should have:

- 4x `A` records for host `@`:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- 1x `CNAME` record:
  - host `www` -> `legendteddy.github.io`

If GitHub shows “`www` is improperly configured”, it is usually propagation/caching. Wait 10 to 30 minutes and click “Check again”.

## Important repo constraint (GitHub Pages routing)

GitHub Pages does not support Netlify-style `_redirects`. Prefer explicit `.html` links.

- Official inquiry form URL: `https://caramellabrunei.com/contact-us.html`
- `get-a-quote.html` is a `noindex` redirect page to `contact-us.html` (there is no second form endpoint).

## What to ignore

The repo still contains `netlify.toml` and `_redirects` from a previous Netlify attempt. They are not used by GitHub Pages.

