import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// import { createCheckoutRouter } from './routes/createCheckout.js';

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// app.use('/api', createCheckoutRouter);
// health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.json({ status: 'ok' });
});

export default app;
