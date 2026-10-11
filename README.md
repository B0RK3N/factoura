# B0RK3N Invoice Lab

**[Try the live app](https://b0rk3n.github.io)**

A dark, browser-based quote and invoice maker for independent work. This project is built with plain HTML, CSS, and JavaScript as part of my web development learning.

## What it does

- Creates invoices and quotes in English, French, or Arabic, with right-to-left Arabic previews.
- Calculates TND totals to three decimal places, including optional discount and tax.
- Shows a live preview and prints a clean PDF using the browser print dialog.
- Saves documents in your browser and tracks paid, outstanding, and overdue amounts.
- Searches and filters saved documents.
- Exports and restores JSON backups, including backups from the earlier Factoura version.

## How to use it

1. Open the live app and choose **Invoice** or **Quote**.
2. Enter your business and client details, then add services and prices.
3. Choose the document language and check the live preview.
4. Save it in the browser, then click **Print / PDF** and choose **Save as PDF**.
5. Export a backup if you want to move your documents to another device or browser.

## Run locally

Serve the `dist` folder with any static web server, or open `dist/index.html` in a modern browser. There is no build step or backend.

## Privacy and limitations

Data stays in the browser where you created it. Clearing site data can erase saved documents, so export backups regularly. Each website address has separate browser storage: export a backup from the older Factoura URL and restore it on the new site if you need existing documents. This is a learning prototype; check applicable invoice requirements before professional use.
