import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Static and health check stuff is fine here
app.get('/api/health', (_, res) => {
  console.log('✅ Health check hit');
  res.json({ status: 'ok' });
});

app.use(express.static('public'));

export default app;
