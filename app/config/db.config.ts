if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const DB_HOST = process.env.DB_HOST || 'mongodb';
const APP_NAME = process.env.APP_NAME || 'react-app';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASSWORD || 'root';

const mongoUri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/?retryWrites=true&w=majority&appName=${APP_NAME}`;

export default mongoUri;
