# Caramella Website Hosting Guide

Since you have the domain (**caramellabrunei.com**) on **Namecheap**, you have 3 excellent options to host this static website.

## Option 1: Netlify (Recommended - Easiest & Fastest)
**Best for:** Free SSL, Global CDN speed, "Drag & Drop" simplicity.

1.  **Sign Up**: Go to [netlify.com](https://www.netlify.com) and sign up (Free).
2.  **Deploy**:
    *   Log in and go to "Sites".
    *   **Drag and drop** your entire `Caramella Website` folder onto the page.
    *   It will be online instantly (e.g., `caramella-random-name.netlify.app`).
3.  **Connect Domain**:
    *   In Netlify, go to **Domain Settings** > **Add Custom Domain**.
    *   Enter `www.caramellabrunei.com`.
4.  **Configure Namecheap DNS**:
    *   Netlify will give you specific DNS records (usually a CNAME for `www` and an A record for the root `@`).
    *   Log in to Namecheap > **Domain List** > **Manage** > **Advanced DNS**.
    *   Add the records Netlify provides.
    *   *Wait 30 mins for propagation.*

---

## Option 2: GitHub Pages (Best for Developers)
**Best for:** Version control backup + Hosting in one.

1.  **Create Repo**: Go to GitHub.com, create a new public repository (e.g., `caramella-website`).
2.  **Push Code**:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/caramella-website.git
    git branch -M main
    git push -u origin main
    ```
3.  **Enable Pages**:
    *   Go to Repo **Settings** > **Pages**.
    *   Source: `Deploy from a branch` > `main` > `/ (root)`.
4.  **Connect Domain**:
    *   In the same Pages settings, enter `www.caramellabrunei.com`.
    *   GitHub will create a `CNAME` file in your repo.
5.  **Configure Namecheap DNS**:
    *   **Type**: CNAME Record | **Host**: `www` | **Value**: `YOUR_USERNAME.github.io`
    *   **Type**: A Record | **Host**: `@` | **Value**: `185.199.108.153`
    *   (Add all 4 GitHub IP A-records shown in their docs).

---

## Option 3: Namecheap Hosting (Legacy/Paid)
**Best for:** If you want email hosting + website in one billing panel.

1.  **Purchase Hosting**: Buy a "Stellar" plan on Namecheap (~$2-4/mo).
2.  **Link Domain**: It will auto-link since you bought it there.
3.  **Upload Files**:
    *   Go to **cPanel** > **File Manager**.
    *   Open `public_html`.
    *   Upload all your HTML/CSS/JS files there.
    *   *Note: This is manual. Every time you change code, you must re-upload.*

---

## 🏆 Recommendation
**Use Option 1 (Netlify)** or **Option 2 (GitHub Pages)**.
They are **free**, **faster** (CDN), and handle HTTPS (SSL) automatically. Namecheap's default shared hosting is often slower for static sites and costs money.

### Immediate Action
If you want to use **GitHub Pages**, create the repo on GitHub first, then paste the URL here. I will set up the remote and push for you.
