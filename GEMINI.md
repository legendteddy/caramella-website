# GEMINI.md - Caramella Website
> Context for the Sovereign Agent

## Project Identity
- **Type**: Static Website (HTML5, CSS3, Vanilla JS)
- **Theme**: "Trillion Dollar Museum" (Dark Mode, Gold #FFD700, Glassmorphism)
- **Business**: Luxury Renovation & Cabinetry (Brunei)

## Core Directives
1. **No Frameworks**: Do not introduce React, Vue, or Bundlers. Keep it simple.
2. **Mobile First**: Every change must work on 375px screens.
3. **SEO Critical**: Maintain JSON-LD, Meta Tags, and Open Graph data.

## Sovereign Protocols
- **Audit First**: Before editing `index.html`, read the whole file (or chunks).
- **Inline vs External**: `CLAUDE.md` mentions inline styles/scripts. We prefer **External** files (`css/style.css`, `js/app.js`) for maintainability.
- **Verification**: Browser check required (simulate via `read_browser` if available, or manual inspection).

## Skill Mapping
- `web-development` (Partial): Use for CSS/HTML best practices, ignore React parts.
- `code-review`: Enforce strict HTML5 semantics.
- `git-workflow`: Use for version control.
