const isAppInProduction = process.env.NODE_ENV === 'production';
if (!isAppInProduction) require('dotenv').config();

const APP_NAME = process.env.APP_NAME || 'react-app';
const DB_HOST = process.env.DB_HOST || 'mongodb';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASSWORD || 'root';
const DB_PORT = process.env.DB_PORT || '27017';

let mongoUri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/?retryWrites=true&w=majority&appName=${APP_NAME}`;
if (!isAppInProduction) mongoUri = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`;

export default mongoUri;
