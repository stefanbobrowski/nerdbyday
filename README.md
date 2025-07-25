# Nerd by Day T-Shirt Store

A simple full‑stack merch site to sell **"Nerd by Day"** T‑shirts. Built with a Vite + React frontend and an Express + Stripe backend.

---

## 🗂️ Project Structure

```
/root
├─ frontend/         # Vite + React app
├─ backend/          # Express server with Stripe integration
├─ .gitignore        # ignores node_modules, .env, etc.
└─ README.md         # this file
```

---

## 📦 Installation & Setup

### Prerequisites

- Node.js v18+
- npm or Yarn
- A Stripe account (for test & live API keys)

### Backend Setup

1. `cd backend`
2. Copy environment example and configure:

   ```bash
   cp .env.example .env
   # Within .env, set:
   STRIPE_SECRET_KEY=sk_test_…
   CLIENT_URL=http://localhost:5173
   STRIPE_WEBHOOK_SECRET=whsec_…   # only if using webhooks
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start server:

   ```bash
   npm run dev
   # or
   node server.js
   ```

### Frontend Setup

1. `cd frontend`
2. Copy and configure:

   ```bash
   cp .env.local.example .env.local
   # In .env.local, set:
   VITE_CLIENT_URL=http://localhost:3000
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start dev server:

   ```bash
   npm run dev
   ```

Your app will run at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

---

## 🛒 Usage

1. Visit the homepage to browse products.
2. Click **Buy Now** to open the Stripe Checkout page.
3. Enter your shipping & payment details.
4. After payment, you'll be redirected to `/success?session_id=…` to view and print your receipt.

---

## 🔧 Available Scripts

### Backend

- `npm run dev` – start development server

### Frontend

- `npm run dev` – start Vite dev server
- `npm run build` – create production build

---

## 🌐 Deployment

- **Frontend**: Deploy the `dist` folder to Netlify, Vercel, or any static host.
- **Backend**: Deploy to Heroku, Google Cloud Run, AWS Elastic Beanstalk, or any Node.js hosting.
- Configure environment variables (`STRIPE_SECRET_KEY`, `CLIENT_URL`, etc.) in your production environment.

---

## 📜 GitHub & Author

- Repository: [https://github.com/stefanbobrowski/nerdbyday](https://github.com/stefanbobrowski/nerdbyday)
- Author: **Stefan Bobrowski** ([stefanbobrowski1@gmail.com](mailto:stefanbobrowski1@gmail.com))

---

## 📝 Notes

- You can fulfill orders manually from the Stripe Dashboard until you're ready to automate with webhooks.

Enjoy selling those T‑shirts! 🎉
