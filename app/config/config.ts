// App
const APP_ENV = process.env.NODE_ENV || 'development';

// API
const PORT = process.env.SERVER_PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';
const API_BASE_URL = `/api/${API_VERSION}`;

// Jwt
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN) || 1;

// Encryption 
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || 'test';

const config = {
    env: APP_ENV,
    encryption_secret: ENCRYPTION_SECRET,
    port: PORT,
    api_version: API_VERSION,
    api_base_url: API_BASE_URL,
    jwt_secret: JWT_SECRET,
    jwt_expires_in: JWT_EXPIRES_IN
};

export default config;
