// models/categories.js
import db from '../db.js';

// Retrieve all service project categories from the database using an arrow function
const getAllCategories = async () => {
  const result = await db.query('SELECT * FROM category ORDER BY category_name;');
  return result.rows;
};

export default {
  getAllCategories
};