// import { Router } from 'express';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2025-06-30.basil',
// });

// export const createCheckoutRouter = Router();

// createCheckoutRouter.post('/create-checkout-session', async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'Nerd by Day T-Shirt',
//             },
//             unit_amount: 2500,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${process.env.CLIENT_URL}/success`,
//       cancel_url: `${process.env.CLIENT_URL}/cancel`,
//     });

//     res.json({ url: session.url });
//   } catch (err) {
//     console.error('Stripe Error:', err);
//     res.status(500).json({ error: 'Stripe error' });
//   }
// });
