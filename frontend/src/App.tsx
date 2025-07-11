import { useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);

  const triggerHealthCheck = async () => {
    const res = await fetch('http://localhost:3000/health');
    const data = await res.json();
    console.log(data);
  };

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
    });
    const data = await res.json();
    window.location.href = data.url;
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
