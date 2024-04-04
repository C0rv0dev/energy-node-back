// Boot
if (process.env.NODE_ENV != 'production') require('dotenv').config();

// Dependencies
import cors from 'cors';
import express from 'express';
import config from './app/config/config';
import connectToDatabase from './app/config/connectToDatabase';
import notesController from './app/http/controllers/notesController';

// Init
const app = express();
const PORT = config.port;
const baseUrl = config.api_base_url;

app.use(cors());
app.use(express.json());

// Database
connectToDatabase();

// Routing 
app.get(`${baseUrl}/notes`, notesController.fetchNotes);
app.get(`${baseUrl}/notes/:id`, notesController.getNote);
app.post(`${baseUrl}/notes`, notesController.createNote);
app.put(`${baseUrl}/notes/:id`, notesController.updateNote);
app.delete(`${baseUrl}/notes/:id`, notesController.deleteNote);

// Start server
app.listen(PORT);
