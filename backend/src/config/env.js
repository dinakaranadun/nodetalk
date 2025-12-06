import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const requiredEnvVars = [
  'PORT',
  'NODE_ENV',
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'JWT_REFRESH_SECRET',
  'JWT_REFRESH_EXPIRES_IN',
  'RESEND_API_KEY',
  'CLIENT_URL',
  'EMAIL_FROM',
  'EMAIL_FROM_NAME',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'ARCJET_KEY',
  'ARCJET_ENV'
];

// Check for missing environment variables
const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}\n` +
    `Please check your .env.${process.env.NODE_ENV || 'development'}.local file`
  );
}

export const {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  RESEND_API_KEY,
  CLIENT_URL,
  EMAIL_FROM,
  EMAIL_FROM_NAME,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  ARCJET_KEY,
  ARCJET_ENV
} = process.env;