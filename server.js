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

// Database initialization and seeding function using arrow syntax
const seedDatabase = async () => {
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
            console.log('Initial categories seeded successfully.');
        }
    } catch (err) {
        console.error('Error seeding database:', err);
    }
};

seedDatabase();

// Home route handler using arrow function
app.get('/', async (req, res) => {
  try {
    res.render('index', { title: 'Home' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Organizations route handler retrieving dynamic data (or placeholders structured for rendering)
app.get('/organizations', async (req, res) => {
  try {
    // Dynamic data retrieval representation for organizations page
    const organizations = [
      { organization_id: 1, organization_name: 'Green Earth Alliance' },
      { organization_id: 2, organization_name: 'Community Youth Center' }
    ];
    res.render('organizations', { 
      title: 'Organizations',
      organizations: organizations 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Projects route handler retrieving dynamic data
app.get('/projects', async (req, res) => {
  try {
    const projectsResult = await db.query('SELECT * FROM project;');
    res.render('projects', { 
      title: 'Service Projects',
      projects: projectsResult.rows 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Categories route handler using arrow function
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

// Dynamic category detail route handler using arrow function
app.get('/categories/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    res.send(`Viewing service projects for category ID: ${categoryId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Start server listener using arrow function
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});