# Factoura

A simple quote and invoice app for freelancers in Tunisia. Create a document, check its live preview, and print it or save it as a PDF.

**[Try the live demo](https://factoura-freelance.blond-jay-1497.chatgpt.site)**

## Features

- French interface with French or Arabic documents
- Tunisian dinar amounts displayed to three decimal places
- Editable services, quantities, prices, discounts, and tax
- Live document preview and browser printing to PDF
- Browser-local saved documents and payment tracking
- Total invoiced, paid, and outstanding summaries
- Fresh document references and duplicate-reference checks
- JSON backup export and restore with validation and duplicate protection
- Search by client or reference and filter by payment state
- Overdue invoice badges and an overdue total

## Run locally

Open `dist/index.html` in a modern browser, or serve the `dist` directory using a static HTTP server. No installation or build step is needed.

## Use the app

1. Choose an invoice or quote and enter your details and the client.
2. Add services and prices. Tax defaults to zero; set it to suit your situation.
3. Save the document in your browser.
4. Click **Imprimer / PDF** and choose **Save as PDF** in the print dialog.
5. Click **Nouveau document** to start the next document without overwriting the last one.

## Built with

HTML, CSS, and JavaScript. Browser local storage holds documents. There is no backend, account system, or cloud database.

## Privacy and limitations

Saved documents stay on the current device and browser. Clearing browser storage can remove them. Download a backup regularly; use Restore to import a backup on another browser. Existing documents are preserved and duplicates skipped. Demo details are fictional. Browser PDF output depends on the print settings. This prototype does not guarantee compliance with invoicing requirements.

## Next improvements

- Cloud synchronization
- Business address and registration fields
- A saved-client directory
- Dedicated PDF downloads
- A fully translated interface

## Validation

Checked in the browser: saving invoices, discounts and tax totals, payment status updates, new document references, and Arabic document rendering. JavaScript syntax was also checked.
