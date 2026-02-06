# Deployment (GitHub Pages + Namecheap DNS)

This repo is a static site (no build step). Production hosting is **GitHub Pages** with the custom domain:

- `https://caramellabrunei.com/`

## 1) Enable GitHub Pages

In the GitHub repo:

1. Go to `Settings -> Pages`.
2. Under `Build and deployment`:
   - Source: `Deploy from a branch`
   - Branch: `main` and `/(root)`
3. Under `Custom domain`, set: `caramellabrunei.com`
4. Enable `Enforce HTTPS` after DNS verification completes.

## 2) Namecheap DNS records

Namecheap `Domain List -> Manage -> Advanced DNS`:

1. Add 4 `A` records for host `@`:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
2. Add 1 `CNAME`:
   - host `www` -> `legendteddy.github.io`

GitHub will show “DNS check in progress” while records propagate (often 10 to 60 minutes).

## 3) Important routing note

GitHub Pages does not support Netlify-style redirects. Use explicit `.html` links.

- Official inquiry form URL: `contact-us.html`
- `get-a-quote.html` is a `noindex` redirect page to `contact-us.html` (avoid multiple form endpoints)
