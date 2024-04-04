// Boot
if (process.env.NODE_ENV != 'production') require('dotenv').config();

// Dependencies
import cors from 'cors';
import express from 'express';
import connectToDatabase from './app/config/connectToDatabase';
import notesController from './app/http/controllers/notesController';

// Init
const app = express();
const PORT = process.env.PORT || 10;

app.use(express.json());
app.use(cors());

// Database
connectToDatabase();

// Routing 
app.get('/api/notes', notesController.fetchNotes);
app.get('/api/notes/:id', notesController.getNote);
app.post('/api/notes', notesController.createNote);
app.put('/api/notes/:id', notesController.updateNote);
app.delete('/api/notes/:id', notesController.deleteNote);

// Start server
app.listen(PORT);
