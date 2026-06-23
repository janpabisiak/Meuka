import 'dotenv/config';

export const API_PORT = +process.env.API_PORT!;
export const API_WHITELIST = process.env.API_WHITELIST!;
export const API_METHODS = process.env.API_METHODS!;

export const API_RATE_LIMIT_TIME = +process.env.API_RATE_LIMIT_TIME!;
export const API_RATE_LIMIT_REQUESTS = +process.env.API_RATE_LIMIT_REQUESTS!;

export const DATABASE_URL = process.env.DATABASE_URL!;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD!;

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

export const BCRYPT_ROUNDS = +process.env.BCRYPT_ROUNDS!;
