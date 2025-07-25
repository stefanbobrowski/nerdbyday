import { useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);

  const triggerHealthCheck = async () => {
    const res = await fetch('/api/health');
    const data = await res.json();
    console.log(data);
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });
      const data = await res.json();
      if (!data.url) throw new Error('Invalid session');
      window.location.href = data.url;
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Nerd By Day T-Shirt</h1>
      <button onClick={triggerHealthCheck}>API Health Check</button>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Redirecting...' : 'Buy Now – $25'}
      </button>
    </div>
  );
}

export default App;
