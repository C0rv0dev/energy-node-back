// Boot
if (process.env.NODE_ENV != 'production') require('dotenv').config();

// Dependencies
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import config from './app/config/config';
import connectToDatabase from './app/config/connectToDatabase';
import EnergyUseController from './app/http/controllers/EnergyUseController';
import HomeController from './app/http/controllers/HomeController';
import AppSettingsController from './app/http/controllers/AppSettingsController';
import UserController from './app/http/controllers/UserController';
import AuthMiddleware from './app/http/middlewares/AuthMiddleware';

// Init
const app = express();
const PORT = config.port;
const baseUrl = config.api_base_url;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));

// Database
connectToDatabase();

// Routing 

// Public Routes
// Auth
app.post(`${baseUrl}/auth/login`, UserController.login);
app.post(`${baseUrl}/auth/register`, UserController.register);
app.post(`${baseUrl}/auth/logout`, UserController.logout);

// Private Routes

// Home
app.get(`${baseUrl}/home-display`, HomeController.fetchSettings);

// Settings
app.put(`${baseUrl}/energy/settings`, AppSettingsController.updateSettings);

// Energy use
app.get(`${baseUrl}/energy/my-usage`, EnergyUseController.fetchEnergyUse);
app.post(`${baseUrl}/energy/my-usage`, EnergyUseController.createEnergyUse);
app.put(`${baseUrl}/energy/my-usage/:id`, EnergyUseController.updateEnergyUse);
app.delete(`${baseUrl}/energy/my-usage/:id`, EnergyUseController.deleteEnergyUse);

// Start server
app.listen(PORT);
