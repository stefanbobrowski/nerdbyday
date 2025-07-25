import { useEffect, useState } from 'react';

type SessionData = {
  id: string;
  created: number;
  amount_total: number;
  currency: string;
  payment_status: string;
  customer_details?: {
    name?: string;
    email?: string;
    address?: {
      line1: string;
      line2?: string | null;
      city: string;
      state?: string | null;
      postal_code: string;
      country: string;
    };
  };
};

export default function Success() {
  const [session, setSession] = useState<SessionData | null>(null);

  // fetch the session
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    if (!sessionId) return;
    fetch(`/api/checkout-session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then(setSession)
      .catch(console.error);
  }, []);

  if (!session) return <p>Loading your receipt…</p>;

  const { id, created, amount_total, currency, payment_status, customer_details } = session;

  // dates
  const orderDate = new Date(created * 1000).toLocaleDateString();
  const shipBy = new Date((created + 2 * 24 * 3600) * 1000).toLocaleDateString();
  const arriveBy = new Date((created + 7 * 24 * 3600) * 1000).toLocaleDateString();

  // grab name + address
  const name = customer_details?.name;
  const addr = customer_details?.address;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 20,
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1.5,
      }}
    >
      <h1>🎉 Thanks for your order{name ? `, ${name}` : ''}!</h1>
      <p>
        Your order <strong>#{id}</strong> was placed on <strong>{orderDate}</strong>.
      </p>

      <section style={{ marginTop: 20 }}>
        <h2>Order Summary</h2>
        <p>
          <strong>Amount Paid:</strong> ${(amount_total / 100).toFixed(2)} {currency.toUpperCase()}
        </p>
        <p>
          <strong>Payment Status:</strong> {payment_status}
        </p>
      </section>

      {addr && (
        <section style={{ marginTop: 20 }}>
          <h2>Shipping Address</h2>
          <p>
            <strong>{name}</strong>
            <br />
            {addr.line1}
            {addr.line2 ? `, ${addr.line2}` : ''}
            <br />
            {addr.city}, {addr.state || ''} {addr.postal_code}
            <br />
            {addr.country}
          </p>
        </section>
      )}

      <section style={{ marginTop: 20 }}>
        <h2>What’s Next?</h2>
        <p>
          We’ll ship your T‑shirt by <strong>{shipBy}</strong> and it should arrive by{' '}
          <strong>{arriveBy}</strong>.
        </p>
        <p>
          If you have any questions, email us at{' '}
          <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.
        </p>
      </section>

      <button
        onClick={() => window.print()}
        style={{
          marginTop: 30,
          padding: '10px 20px',
          backgroundColor: '#6772e5',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Print Receipt
      </button>
    </div>
  );
}
