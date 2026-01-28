# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for Caramella Trading Co., a luxury renovation and cabinetry company based in Brunei. The site showcases their portfolio, technical specifications, and services across multiple HTML pages.

## Architecture

### Core Structure
- **Static HTML/CSS/JS** - No backend framework, pure static site
- **Modular Design System** - Shared CSS custom properties across all pages
- **Heavy SEO Integration** - JSON-LD structured data, meta tags, Open Graph
- **Progressive Web App Features** - PWA manifest, service worker ready
- **Mobile-First Responsive Design** - Advanced breakpoints and optimizations

### Design System ("Trillion Dollar Museum" Theme)
- **Dark Mode Foundation** - Black background with glass morphism effects
- **Consistent Color Tokens** - Gold (#FFD700) accents, sapphire glass overlays
- **Advanced Animations** - 3D tilt effects, diamond refraction wipes
- **Typography System** - Outfit font with monospace technical accents

## Common Development Tasks

### Building & Testing
```bash
# No build tools required - site is static HTML
# Visual testing in browser
# SEO validation via structured data tools
```

### Performance Optimization
- Images are pre-loaded via PWA manifest
- CSS is componentized with reusable variables
- JavaScript uses vanilla patterns (no heavy frameworks)
- Lazy loading via intersection observer for case studies

### Content Updates
- Edit content directly in HTML files
- Case studies follow consistent article structure
- Maintain technical accuracy for renovation specifications
- Preserve JSON-LD schema data for SEO

## File Structure Notes

### HTML Pages
- `index.html` - Main landing with hero section and feature highlights
- `portfolio.html` - Technical case studies with detailed specifications
- `inspiration.html` - Design concepts and project galleries
- `faq.html` - Knowledge base with structured FAQ data
- `tech-specs.html` - Manifesto and material specifications
- `404.html` - Custom error page

### Assets
- **Images** - Organized in `images/` folder with semantic naming
- **Manifest** - PWA configuration in `manifest.json`
- **SEO** - `robots.txt` and `sitemap.xml` for search engines

## Development Standards

### Technical Specifications
- All pages use identical CSS custom property definitions
- Consistent semantic HTML5 structure
- Schema.org markup for search engine optimization
- Brunei-specific content (locations: RPN Rimba, Jerudong, KB, Seria)

### Code Quality
- Mobile-first responsive design with `@media` breakpoints
**Claude Edits:** Prefer Edit over Write; reference line numbers (e.g. portfolio.html:860 for JS calls).
- Clean, semantically structured HTML
- Performance-optimized CSS with CSS variables
- JavaScript uses progressive enhancement techniques

### Content Guidelines
- Maintain technical accuracy for renovation specifications
- Use Brunei localization (currency, locations, businesses)
- Preserve SEO schema data across all pages
- Case studies follow consistent technical format (Challenge, Solution, Technical Notes)

## Git & Deployment

### Repository Structure
- No build process required
- Static files ready for direct deployment
- Images and content assets version-controlled
- Clean HTML/CSS/JS structure for easy maintenance

### Deployment Notes
- Site is production-ready static HTML
- No dependencies or build tools required
- Optimized for Brunei hosting environments
- Includes PWA features for mobile app-like experience

## Important URLs
- Main domain: `https://www.caramellabrunei.com/`
- Canonical URLs on all pages
- Brunei-specific content and targeting

## Claude Code Notes
`WebSearch/WebFetch` - unavailable (404 API errors); use Task(Explore) or prior knowledge.
`Read large HTML` - index.html/portfolio.html >25k tokens; use Grep/offset+limit.
`git workflow` - no repo by default; git init before commits.
`file edits` - all CSS/JS inline in &lt;style&gt;/&lt;script&gt;; use precise string replaces.
`verification` - browser Lighthouse audit; no unit tests."
</xai:function_call ><xai:function_call name="Edit">
<parameter name="file_path">C:\Users\thoma\Desktop\Caramella Website\CLAUDE.md