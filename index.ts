// Boot
if (process.env.NODE_ENV != 'production') require('dotenv').config();

// Dependencies
import cors from 'cors';
import express from 'express';
import config from './app/config/config';
import connectToDatabase from './app/config/connectToDatabase';
import EnergyUseController from './app/http/controllers/EnergyUseController';
import HomeController from './app/http/controllers/HomeController';

// Init
const app = express();
const PORT = config.port;
const baseUrl = config.api_base_url;

app.use(cors());
app.use(express.json());

// Database
connectToDatabase();

// Routing 

// Home
app.get(`${baseUrl}/home-display`, HomeController.index);

// Energy use
app.get(`${baseUrl}/energy/my-usage`, EnergyUseController.fetchEnergyUse);
app.post(`${baseUrl}/energy/my-usage`, EnergyUseController.createEnergyUse);
app.put(`${baseUrl}/energy/my-usage/:id`, EnergyUseController.updateEnergyUse);
app.delete(`${baseUrl}/energy/my-usage/:id`, EnergyUseController.deleteEnergyUse);

// Start server
app.listen(PORT);
