# Google Search Console Indexing Guide

Since you have updated your site, you want Google to know about it ASAP. Here is the fastest way to get indexed.

## Step 1: Add Property to Search Console

1.  Go to [Google Search Console](https://search.google.com/search-console/welcome).
2.  **Select Property Type**: Choose **Domain** (the one on the left).
    *   Enter: `caramellabrunei.com`
    *   Click **Continue**.

## Step 2: Verify Ownership (via Namecheap)

Google needs to prove you own the domain. It will ask you to add a DNS record.

1.  **Copy** the TXT record Google gives you (starts with `google-site-verification=...`).
2.  Log in to **Namecheap**.
3.  Go to **Domain List** > **Manage** > **Advanced DNS**.
4.  Click **Add New Record**:
    *   **Type**: TXT Record
    *   **Host**: `@`
    *   **Value**: Paste the code from Google.
    *   **TTL**: Automatic.
5.  Save changes.
6.  Go back to Google Search Console and click **Verify**.
    *   *Note: It might take a few minutes for the DNS to propagate. If it fails, wait 5 mins and try again.*

## Step 3: Submit Your Sitemap

Once verified and inside the dashboard:

1.  On the left sidebar, click **Sitemaps**.
2.  In the "Add a new sitemap" box, type: `sitemap.xml`
3.  Click **Submit**.
4.  You should see a "Success" status. This prompts Google to recrawl the URLs listed in the sitemap.

## Step 4: Request Indexing (Optional but Recommended)

1.  Paste a canonical URL (non-`www`) into the top search bar ("Inspect any URL"), e.g. `https://caramellabrunei.com/`.
2.  Wait for the data to load.
3.  Click **Request Indexing**.

Tip: use the canonical host when inspecting, e.g. `https://caramellabrunei.com/contact-us.html`.

## How Long Does It Take?
*   **With Sitemap**: 24-48 hours usually.
*   **Without**: Can take weeks.

You have already done the hard work by having a perfect `robots.txt` and `sitemap.xml`. This last step is just handing the map to Google.
