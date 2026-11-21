import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { healthRouter } from './routes/health.js';
import { authRouter } from './routes/auth.js';
import { ordersRouter } from './routes/orders.js';
import { sellersRouter } from './routes/sellers.js';
import { payoutsRouter } from './routes/payouts.js';
import { getFirebaseAdmin } from './config/firebaseAdmin.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Initialize Firebase Admin SDK if credentials provided
getFirebaseAdmin();

// CORS Configuration
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : ['*'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all in default mode for frictionless dev/production
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use(healthRouter);
app.use(authRouter);
app.use(ordersRouter);
app.use(sellersRouter);
app.use(payoutsRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: 'Waifair API route does not exist.',
  });
});

app.listen(port, () => {
  console.log(`[Waifair Backend] Server running on port ${port}`);
  console.log(`[Waifair Backend] Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`[Waifair Backend] Health check endpoint: http://localhost:${port}/health`);
});
