if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const DB_HOST = process.env.DB_HOST || 'energy-node_mongo_1';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || 'root';

const mongoUri = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}`;
export default mongoUri;
