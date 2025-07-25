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
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: 'price_1Ro4FYRVMHldKKBAtS6H06wU',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
        shipping_address_collection: {
          allowed_countries: ['US', 'CA' /* etc */],
        },
      });
      res.json({ url: session.url });
    } catch (err) {
      console.error('Stripe Error:', err);
      res.status(500).json({ error: 'Stripe error' });
    }
  });

  return router;
};
