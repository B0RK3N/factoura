# Factoura

**[Open Factoura ↗](https://factoura-freelance.blond-jay-1497.chatgpt.site/)**

Quotes and invoices for freelancers, from first draft to payment. The live Factoura app supports French and Arabic documents, TND totals, a live preview, payment tracking, PDF printing, and browser-local backups.

## Features

- Create invoices and quotes with service line items, discounts, and tax.
- Preview documents as you edit.
- Track paid, outstanding, and overdue amounts.
- Search and filter saved documents.
- Print to PDF and export or restore JSON backups.

## Source and local use

This repository contains the related Invoice Lab implementation in plain HTML, CSS, and JavaScript, including an English document option. Its interface differs from the live Factoura site linked above.

Serve `dist/` with any static web server, or open `dist/index.html` in a modern browser. There is no build step or backend.

## Data

Documents are stored in the browser where they were created. Export a JSON backup before clearing site data or moving to another device. Storage is separate for each website address.

This is a learning project. Check required invoice details before professional use.
