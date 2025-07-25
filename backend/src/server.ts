import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import Stripe from 'stripe';
import { createCheckoutRouter } from './routes/createCheckout.js';
import app from './app.js';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error('❌ STRIPE_SECRET_KEY not set');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-06-30.basil',
});

// Inject stripe into your app routes
app.use('/api', createCheckoutRouter(stripe));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Backend listening on port ${PORT}`);
});
