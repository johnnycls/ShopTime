import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const ROOT_PASSWORD = process.env.ROOT_PASSWORD;
export const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET;

// 3.4% + HK$2.35
export const MIN_CHARGE = { HKD: { min: 150, surcharge: 5 } };
