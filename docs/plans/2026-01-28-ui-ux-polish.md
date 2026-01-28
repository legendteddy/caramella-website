# UI/UX Polish to World-Class Level Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Elevate Caramella Website to world-class luxury UI/UX by simplifying hero/interactions, removing distracting features (particles, preloader, counters), sharpening emotional renovation hook, and optimizing performance while preserving SEO/CLAUDE.md standards.

**Architecture:** Edit inline &lt;style&gt;/&lt;script&gt; in HTML files (start with index.html/portfolio.html). Comment out/remove JS distractions. Refine CSS for cleaner glassmorphism. Verify visually. No new files/libs. Mobile-first. Follow CLAUDE.md (static, semantic HTML, SEO preserved).

**Tech Stack:** Vanilla HTML/CSS/JS. Browser dev tools/Lighthouse for verification.

---

### Task 1: Initialize Git Repo (Backup State)

**Files:**
- New: .git (via git init)

**Step 1: Run git init**
```
git init
```
Expected: \"Initialized empty Git repository\"

**Step 2: Add all files**
```
git add .
```
Expected: No errors, all HTML/images staged.

**Step 3: Initial commit**
```
git commit -m \"chore: initial commit before UI polish\"
Co-Authored-By: Claude (x-ai/grok-4.1-fast) &lt;noreply@anthropic.com&gt;
```
Expected: Commit success.

### Task 2: Remove Preloader & Particles (index.html & portfolio.html)

**Files:**
- Modify: index.html:886 (initParticles call)
- Modify: portfolio.html:860 (initPreloader/initParticles calls)

**Step 1: Edit index.html - Comment particles**
Use Edit tool:
old_string: `initParticles();`
new_string: `// initParticles(); // removed for simplicity & performance`

**Step 2: Verify edit**
Read index.html, confirm comment.

**Step 3: Edit portfolio.html - Comment preloader/particles**
Edit portfolio.html:
old_string: `initPreloader();\n            initParticles();`
new_string: `// initPreloader(); // removed\n            // initParticles(); // removed`

**Step 4: Hide elements in CSS**
Edit portfolio.html:
old_string: `.preloader,\n        .particles-container {`
new_string: `.preloader,\n        .particles-container {\n            display: none !important;`

**Step 5: Commit**
```
git add index.html portfolio.html
git commit -m \"refactor: remove preloader/particles for clean load\"
Co-Authored-By: Claude (x-ai/grok-4.1-fast) &lt;noreply@anthropic.com&gt;
```

**Verification:** Open files in browser. No preloader delay/particles. Faster load.

### Task 3: Polish Hero Headline - Emotional Hook

**Files:**
- Modify: portfolio.html:612-618 (hero h1/p)

**Step 1: Update headline**
Edit portfolio.html:
old_string: `&lt;h1&gt;The Portfolio: &lt;span class=\"italic-accent\"&gt;Luxury&lt;/span&gt; Renovation &amp; Cabinetry&lt;/h1&gt;`
new_string: `&lt;h1&gt;Your Dream Kitchen Starts Here &lt;span class=\"italic-accent\"&gt;in Brunei&lt;/span&gt;&lt;/h1&gt;`

**Step 2: Emotional subhead**
old_string: `Beyond the aesthetic, every Caramella kitchen is a technical response...`
new_string: `Imagine luxury cabinets that transform your home. See how we've created 600+ dream spaces. Ready to renovate?`

**Step 3: Commit**
```
git add portfolio.html
git commit -m \"feat: emotional hero hook for renovation urge\"
Co-Authored-By: Claude (x-ai/grok-4.1-fast) &lt;noreply@anthropic.com&gt;
```

**Verification:** Hero evokes urgency/aspiration. Test mobile view.

### Task 4: Simplify Animations - Disable Heavy Effects on Mobile

**Files:**
- Modify: portfolio.html:931-955 (init3DTilt)

**Step 1: Disable tilt on mobile**
Edit portfolio.html:
old_string: `if (!hero || !content || window.innerWidth &lt; 968) return;`
new_string: `if (!hero || !content || window.innerWidth &lt; 1200 || 'ontouchstart' in window) return; // disable on touch/mobile`

**Step 2: Reduce CSS blur on mobile**
Edit portfolio.html style:
old_string: `--glass-blur: blur(40px) saturate(200%);`
new_string: `--glass-blur: blur(20px) saturate(180%); /* lighter on mobile */`

**Step 3: Commit**
```
git add portfolio.html
git commit -m \"perf: optimize animations for mobile/world-class perf\"
Co-Authored-By: Claude (x-ai/grok-4.1-fast) &lt;noreply@anthropic.com&gt;
```

**Verification:** Smooth on mobile, Lighthouse perf >90.

### Task 5: Remove Useless Features Across Site (Phase 1)

**Files:**
- Modify: index.html/portfolio.html (counters if present, redundant nav)

**Step 1: Grep for counters/particles**
Grep pattern: `initCounterAnimation|stats`

**Step 2: Comment any found**
Edit: comment out.

**Step 3: Simplify nav - remove badges if distracting**
Edit nav-links: remove `<span class=\"brand-badge\">...</span>`

**Step 4: Commit**
```
git add .
git commit -m \"refactor: remove distractions (counters/badges)\"
Co-Authored-By: Claude (x-ai/grok-4.1-fast) &lt;noreply@anthropic.com&gt;
```

**Verification:** Cleaner UI, focus on content/CTA.

### Task 6: Final Verification & SEO Check

**Step 1: Browser test**
Open index.html/portfolio.html. Check: Fast load, no distractions, emotional hero, responsive.

**Step 2: Lighthouse audit**
Dev tools > Lighthouse > Performance/SEO > Generate. Target: Perf 95+, SEO 100%.

**Step 3: Commit**
```
git add .
git commit -m \"feat: world-class UI/UX polish complete\"
Co-Authored-By: Claude (x-ai/grok-4.1-fast) &lt;noreply@anthropic.com&gt;
```

**Done:** Site polished, ready deploy.
