# Waifair Backend API Service

Node.js / Express API service with Firebase Admin SDK integration, prepared for direct deployment on Railway.

## Overview
This service provides privileged server-side capabilities for the Waifair Marketplace:
- **Health Checks & Monitoring:** `/health` endpoint for Railway zero-downtime health checking.
- **Payment & Order Webhooks:** `/api/orders/webhook` for Stripe, PayPal, and fulfillment courier updates.
- **Server-Side KYC & Security:** `/api/sellers/kyc-verify` for server-side compliance audits.
- **Payout Validation:** `/api/payouts/validate` for banking and crypto payout auditing.
- **Firebase Auth Verification:** `/api/auth/verify` for token validation and role-based custom claims.

## Deployment on Railway
1. Create a new project in [Railway.app](https://railway.app).
2. Choose **Deploy from GitHub repo** and select this repository.
3. Railway automatically detects `railway.json` and `Procfile`.
4. In Railway project settings, add the Environment Variables from `.env.example`:
   - `PORT`: `5000` (or Railway default)
   - `CORS_ORIGIN`: Your deployed Vercel frontend and admin URLs
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `FIREBASE_CLIENT_EMAIL`: Service account email
   - `FIREBASE_PRIVATE_KEY`: Service account private key
5. Railway will automatically build via `npm run build` and run `npm start`.
