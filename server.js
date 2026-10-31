import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  try {
    res.render('index', { title: 'Home' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/organizations', async (req, res) => {
  try {
    res.render('organizations', { title: 'Organizations' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/projects', async (req, res) => {
  try {
    res.render('projects', { title: 'Service Projects' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/categories', async (req, res) => {
  try {
    res.render('categories', { title: 'Service Project Categories' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});