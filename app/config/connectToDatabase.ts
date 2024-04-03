// boot
if (process.env.NODE_ENV != 'production') require('dotenv').config();

import mongoose from 'mongoose';
const uri = process.env.MONGO_URI;

async function connectToDatabase() {
    try {
        if (!uri) {
            throw new Error('Mongo URI not found');
        }

        await mongoose.connect(uri);
        console.log('Connected to Database');
    } catch (err) {
        console.log('Error connecting to Database', err);
    }
}

export default connectToDatabase;
