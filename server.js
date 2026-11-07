import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import db from './db.js';
import categoriesModel from './models/categories.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

async function seedCategories() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS category (
                category_id SERIAL PRIMARY KEY,
                category_name VARCHAR(100) NOT NULL
            );
        `);
        
        const check = await db.query('SELECT COUNT(*) FROM category;');
        if (parseInt(check.rows[0].count) === 0) {
            await db.query(`
                INSERT INTO category (category_name) VALUES
                ('Environmental'),
                ('Educational'),
                ('Community Service'),
                ('Health and Wellness');
            `);
            console.log('Categorías iniciales insertadas correctamente.');
        }
    } catch (err) {
        console.error('Error al inicializar categorías:', err);
    }
}

seedCategories();

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
    const categories = await categoriesModel.getAllCategories();
    res.render('categories', { 
      title: 'Service Project Categories',
      categories: categories 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/categories/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    res.send(`Viewing service projects for category ID: ${categoryId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});