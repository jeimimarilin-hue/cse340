const pool = require('../db');

/* *************************************************.*
 * Get all categories from the database
 **************************************************** */
const getAllCategories = async () => {
  try {
    const result = await pool.query('SELECT * FROM category ORDER BY category_name');
    return result.rows;
  } catch (error) {
    console.error('Error in getAllCategories model:', error);
    throw error;
  }
};

/* *************************************************.*
 * Get a single category by its ID
 **************************************************** */
const getCategoryById = async (category_id) => {
  try {
    const result = await pool.query('SELECT * FROM category WHERE category_id = $1', [category_id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error in getCategoryById model:', error);
    throw error;
  }
};

module.exports = {
  getAllCategories,
  getCategoryById
};