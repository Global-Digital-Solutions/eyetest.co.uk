// NOTE: Run `npm install stripe` before using this module
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
let Stripe: any;
try {
  // Dynamic require so the build doesn't break when stripe isn't installed yet
  Stripe = require("stripe").default ?? require("stripe");
} catch {
  // stripe package not installed — module will throw at runtime if used
}

if (Stripe && !process.env.STRIPE_SECRET_KEY) {
  // Don't throw at build time — Stripe will be undefined and routes will
  // return 500 at runtime if the env var is genuinely missing.
  Stripe = undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stripe: any = Stripe
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-04-30.basil",
    })
  : undefined;

// Price IDs — set these in Vercel env vars
export const PRICES = {
  gold: process.env.STRIPE_PRICE_GOLD!, // £149/year
  platinum: process.env.STRIPE_PRICE_PLATINUM!, // £199/year
  audiology: process.env.STRIPE_PRICE_AUDIOLOGY!, // £69/year add-on
};
