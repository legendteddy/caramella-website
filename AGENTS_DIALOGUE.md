# Netlify Transfer (Plain-English Handover)

## What “transfer to Netlify” actually means

Nothing “moves” automatically. There are 2 separate parts:

1. **Website files (this GitHub repo)**: Netlify reads the files and publishes them.
2. **Domain DNS (caramellabrunei.com)**: your DNS provider must point the domain to Netlify.

The repo part is already prepared. The DNS part must be done in the Netlify UI + your DNS provider UI.

## Current status (repo vs Netlify)

**Repo side: DONE**
- Static site, no build step.
- `netlify.toml` exists (publish repo root).
- Canonical URLs use `https://caramellabrunei.com` (non-`www`).
- `_redirects` includes:
  - `www` -> non-`www` (301)
  - `/pricing` -> `/kitchen-renovation-brunei.html` (301)

**Netlify/DNS side: NOT DONE until domain is verified**
- Netlify must show the custom domain as **verified** and SSL/HTTPS as **active**.

## The only thing you must NOT do

Do **not** change nameservers to Netlify (the `dns1.p03.nsone.net` / `dns2...` / `dns3...` / `dns4...` lines).
That would move all DNS to Netlify DNS. You said you don’t want that.

So we use **External DNS**: keep DNS where it is, just add records.

## Exact goal (what “done” looks like)

- `https://caramellabrunei.com/` loads (HTTPS works).
- `https://www.caramellabrunei.com/` redirects to `https://caramellabrunei.com/`.
- `https://caramellabrunei.com/pricing` redirects to the kitchen pricing page.
- `https://caramellabrunei.com/sitemap.xml` opens.

## What to click in Netlify (high level)

1. Go to the project: `caramella-website` in Netlify.
2. Go to **Domain management**.
3. Find `caramellabrunei.com`.
4. Open the panel that says **Check DNS configuration** / **Verify DNS** / **Awaiting External DNS** (wording varies).
5. Look for a table like “Add these DNS records at your DNS provider”.

That table is the source of truth.

## What to do at your DNS provider

Take the Netlify table and create those records in your DNS provider.
Typical patterns:

- `www` is a **CNAME** pointing to your `*.netlify.app` hostname.
- The root domain `@` is:
  - **A records** to Netlify IP(s), OR
  - an **ALIAS/ANAME** to a Netlify apex target (depends on provider).

Then wait for DNS to propagate (minutes to hours).

## What to send to the next AI agent (minimal)

Copy/paste these items to the next agent:

1. Your DNS provider name (Cloudflare / Namecheap / GoDaddy / etc.)
2. The Netlify “External DNS” table (Host, Type, Value).
3. The Netlify site URL (the `*.netlify.app` address).

With those 3, another agent can tell you exactly what records to add and where to click.

