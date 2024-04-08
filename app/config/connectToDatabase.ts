// boot
if (process.env.NODE_ENV != 'production') require('dotenv').config();

import mongoose from 'mongoose';
import mongoUri from './db.config';

async function connectToDatabase() {
    console.log('Connecting to Database: ' + mongoUri);

    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to Database');
    } catch (err) {
        console.log('Error connecting to Database', err);
    }
}

export default connectToDatabase;
