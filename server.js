import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import baseRoute from './routes/baseRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Use the MVC base routes
app.use('/', baseRoute);

// Catch-all 404 error handler
app.use((req, res) => {
  res.status(404).render('error', { title: '404 Not Found', message: 'Page not found' });
});

// Start server listener using arrow function
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});