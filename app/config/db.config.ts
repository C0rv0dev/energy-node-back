const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || 'secret';
const DB_NAME = process.env.DB_NAME || 'test';

const mongoUri = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
export default mongoUri;
