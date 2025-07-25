import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

// idempotency check: only process once per session.id
const processed = new Set<string>();

export async function fulfillOrder(session: Stripe.Checkout.Session) {
  if (processed.has(session.id)) return;
  processed.add(session.id);

  // 1) fetch line items
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 });

  // 2) fetch customer (for email, shipping, etc)
  const customer = session.customer
    ? await stripe.customers.retrieve(session.customer.toString())
    : null;

  // 3) persist to your DB
  // await db.orders.create({
  //   data: {
  //     sessionId: session.id,
  //     email: (customer as Stripe.Customer)?.email || session.customer_details?.email,
  //     amount: session.amount_total!,
  //     currency: session.currency!,
  //     items: JSON.stringify(
  //       lineItems.data.map((i) => ({
  //         price: i.price?.id,
  //         quantity: i.quantity,
  //       }))
  //     ),
  //     status: 'pending',
  //   },
  // });

  // // 4) trigger fulfillment (warehouse API, send email, etc)
  // await warehouseApi.createShipment({ sessionId: session.id, items: lineItems.data });
  // await emailService.sendOrderConfirmation((customer as Stripe.Customer)?.email!, session.id);

  // // 5) update order status
  // await db.orders.update({
  //   where: { sessionId: session.id },
  //   data: { status: 'shipped', shippedAt: new Date() },
  // });
}
