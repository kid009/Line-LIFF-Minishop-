# Line-LIFF-Minishop

A small online food-ordering web application built on LINE LIFF (LINE Front-end Framework). It lets customers open a mini-shop directly inside a LINE chat, browse products, manage a cart, fill in contact details, and submit the order to a Google Sheet backend.

## Features

- LINE login via LIFF and display of the user's profile (name + picture)
- Product catalog loaded dynamically from Google Sheets using the [OpenSheet](https://opensheet.elk.sh) API
- Category filtering: All, Food, Desert, Snack, Drink
- Real-time cart with a sticky summary bar
- Checkout form: receiver name and phone number
- Order submission to Google Apps Script, which records the order in Google Sheets
- Automatic closing of the LIFF window and return to the LINE chat after a successful order

## Project Structure

```
Line-LIFF-Minishop/
├── gas/
│   └── index.html          # Main Minishop LIFF app (static HTML page)
├── FLOWCHART.md            # High-level order workflow diagram
└── README.md               # This file
```

> **Note:** This project is a single static HTML file. No build step is required.

## Configuration

Open `gas/index.html` and update the constants in the **CONFIGURATION** section:

```javascript
const LIFF_ID = "YOUR_LIFF_ID";                          // LIFF ID from LINE Developer Console
const APP_SCRIPT_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL";   // Google Apps Script Web App URL (doPost)
const OPEN_SHEET_URL = "YOUR_OPENSHEET_URL";             // OpenSheet URL for the products sheet
```

### 1. LIFF ID
1. Create a provider and channel on the [LINE Developers Console](https://developers.line.biz/).
2. Create a LIFF app and copy the LIFF ID.

### 2. Google Sheets Product Catalog
1. Create a sheet named `products` with the following columns:

| Item Name | Category | Price | Image URL |
|-----------|----------|-------|-----------|

2. Share the spreadsheet with **Anyone with the link can view**.
3. Build the OpenSheet URL:
   `https://opensheet.elk.sh/{SPREADSHEET_ID}/products`

The app also recognizes Thai column headers (`ชื่อเมนู`, `หมวดหมู่`, `ราคา`, `รูปภาพ`) if they are used instead.

### 3. Google Apps Script Order Backend
1. Create a new Google Apps Script project.
2. Implement a `doPost(e)` function that receives the JSON payload from the web app.
3. Save the order data to a Google Sheet.
4. Deploy the script as a Web App and paste the deployed URL into `APP_SCRIPT_URL`.

The JSON payload currently sent by the app looks like this:

```json
{
  "lineUid": "...",
  "name": "Customer Name",
  "telephone": "0812345678",
  "orderDetails": [
    { "name": "Product A", "price": 50, "quantity": 2 }
  ]
}
```

## How to Use

1. Upload or host `gas/index.html` on any static web server.
2. Set the LIFF endpoint in the LINE Developers Console to point to the hosted `index.html` URL.
3. Users open the app from a LINE chat. LIFF logs them in and loads the shop.
4. Customers browse products, add items to the cart, fill in their details, and submit the order.

## Workflow

See [`FLOWCHART.md`](./FLOWCHART.md) for a high-level Mermaid diagram of the order flow.

## Notes & Suggestions

- **Security:** `APP_SCRIPT_URL` and `OPEN_SHEET_URL` are stored on the client side. If you need to hide them, use a backend proxy or environment variables.
- **Notifications:** Consider integrating the LINE Messaging API to send order confirmations to the customer and alerts to the admin.
- **Payments:** The current flow records the order after checkout. It can be extended to support payment-slip upload or other payment methods later.

## Tech Stack

- [LINE LIFF SDK](https://developers.line.biz/en/docs/liff/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- Vanilla JavaScript
- Google Sheets + Google Apps Script
- [OpenSheet](https://opensheet.elk.sh) API

## License

This project is provided as a learning example. Feel free to modify and use it for your own needs.
