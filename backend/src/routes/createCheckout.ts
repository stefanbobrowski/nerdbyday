import { Router } from 'express';
import Stripe from 'stripe';

export const createCheckoutRouter = (stripe: Stripe): Router => {
  const router = Router();

  router.get('/checkout-session', async (req, res) => {
    const sessionId = req.query.session_id as string;
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      res.json(session);
    } catch (err) {
      console.error('Error retrieving checkout session:', err);
      res.status(500).json({ error: 'Unable to retrieve session' });
    }
  });

  router.post('/create-checkout-session', async (req, res) => {
    const { size } = req.body; // e.g. 'M'

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Nerd by Day T‑Shirt (Size: ${size})`,
                metadata: { size },
              },
              unit_amount: 2500,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        metadata: { size },
        shipping_address_collection: { allowed_countries: ['US', 'CA'] },
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });
      res.json({ url: session.url });
    } catch (err) {
      console.error('Stripe Error:', err);
      res.status(500).json({ error: 'Stripe error' });
    }
  });

  return router;
};
