import { useState } from 'react';
import './App.css';
import nerdtshirt from './assets/nerdtshirt.png';

function App() {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<'S' | 'M' | 'L' | 'XL'>('M');

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ size }),
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
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h1>Nerd By Day T-Shirt</h1>

      <div>
        <img src={nerdtshirt} alt="Nerd By Day T-Shirt" style={{ maxWidth: 300 }} />
      </div>

      <div style={{ margin: '20px 0' }}>
        <label>
          Size:{' '}
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as any)}
            style={{ padding: '5px 10px', fontSize: '1rem' }}
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </label>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          marginLeft: 10,
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Redirecting...' : `Buy Now – $25 (${size})`}
      </button>
    </div>
  );
}

export default App;
