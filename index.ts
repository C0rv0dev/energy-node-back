// Boot
if (process.env.NODE_ENV != 'production') require('dotenv').config();

// Dependencies
import connectToDatabase from './app/config/connectToDatabase';
import express from 'express';
import notesController from './app/http/controllers/notesController';

// Init
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

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
