'use strict';

const fs = require('node:fs');
const path = require('node:path');

// Node >= 20.12 can read .env without dotenv. Missing file is fine — real
// deployments set the variables in the environment instead.
const envFile = path.join(__dirname, '..', '.env');
if (fs.existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

function requireInt(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  const value = Number.parseInt(raw, 10);
  if (!Number.isInteger(value)) {
    throw new Error(`Invalid ${name}: expected an integer, got "${raw}"`);
  }
  return value;
}

function list(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

const env = process.env.NODE_ENV || 'development';

const config = {
  env,
  isProduction: env === 'production',
  host: process.env.HOST || '0.0.0.0',
  port: requireInt('PORT', 3000),
  // Origins allowed to call the API. The Angular dev server runs on 4200.
  corsOrigins: list('CORS_ORIGINS', ['http://localhost:4200']),
  logLevel: process.env.LOG_LEVEL || (env === 'production' ? 'info' : 'debug'),
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/salary_calculator',
};

module.exports = config;
