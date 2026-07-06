# Minishop Workflow Flowchart

Below is a high-level flowchart that shows how a customer order moves through the Minishop LIFF application.

```mermaid
flowchart TD
    A[Customer opens Minishop in LINE chat] --> B{LIFF initialized?}
    B -->|No| C[LIFF login]
    B -->|Yes| D[Get LINE profile]
    C --> D
    D --> E[Load product list from Google Sheets via OpenSheet]
    E --> F[Display product catalog]
    F --> G[Customer browses / selects category]
    G --> H[Customer adds item to cart]
    H --> I[Update cart summary bar]
    I --> J{Continue shopping?}
    J -->|Yes| G
    J -->|No| K[Open checkout modal]
    K --> L[Customer fills name, phone, address]
    L --> M[Customer uploads payment slip]
    M --> N[Submit order]
    N --> O[POST order data to Google Apps Script]
    O --> P{Submission successful?}
    P -->|Yes| Q[Save order to Google Sheet]
    Q --> R[Show success message]
    R --> S[Close LIFF window and return to chat]
    P -->|No| T[Show error message]
    T --> U[Allow customer to retry]
```

## Step-by-Step Description

1. **Open App** – The user taps the LIFF link inside a LINE chat.
2. **LIFF Initialization** – The app checks whether the user is logged in. If not, it triggers LINE login.
3. **Profile** – The app fetches the LINE profile (user ID, display name, picture) and pre-fills the customer name.
4. **Load Products** – The product list is fetched from Google Sheets using the OpenSheet API.
5. **Browse & Filter** – The user browses products and filters by category.
6. **Add to Cart** – Selected items are added to the in-memory cart.
7. **Cart Summary** – A sticky bar at the bottom shows the running total.
8. **Checkout** – The user opens the checkout modal and fills in delivery details.
9. **Payment Slip** – The user uploads a payment-slip image, which is converted to Base64.
10. **Submit Order** – The app sends the complete payload to Google Apps Script via `fetch` POST.
11. **Backend Processing** – Google Apps Script writes the order details into a Google Sheet.
12. **Result** – On success, the app alerts the user and closes the LIFF window. On failure, it shows an error and allows a retry.
