const pool = require('../db');

/* *************************************************.*
 * Get all projects with their organization details
 **************************************************** */
const getAllProjects = async () => {
  try {
    const query = `
      SELECT p.*, o.organization_name 
      FROM project p 
      LEFT JOIN organization o ON p.organization_id = o.organization_id
      ORDER BY p.project_name
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error in getAllProjects model:', error);
    throw error;
  }
};

/* *************************************************.*
 * Get a single project by its ID along with its organization
 **************************************************** */
const getProjectById = async (project_id) => {
  try {
    const query = `
      SELECT p.*, o.organization_name, o.organization_id 
      FROM project p 
      LEFT JOIN organization o ON p.organization_id = o.organization_id
      WHERE p.project_id = $1
    `;
    const result = await pool.query(query, [project_id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error in getProjectById model:', error);
    throw error;
  }
};

/* *************************************************.*
 * Get all service projects belonging to a specific category
 **************************************************** */
const getProjectsByCategoryId = async (category_id) => {
  try {
    const query = `
      SELECT p.* FROM project p
      JOIN project_category pc ON p.project_id = pc.project_id
      WHERE pc.category_id = $1
      ORDER BY p.project_name
    `;
    const result = await pool.query(query, [category_id]);
    return result.rows;
  } catch (error) {
    console.error('Error in getProjectsByCategoryId model:', error);
    throw error;
  }
};

/* *************************************************.*
 * Get all categories associated with a specific project
 **************************************************** */
const getCategoriesByProjectId = async (project_id) => {
  try {
    const query = `
      SELECT c.* FROM category c
      JOIN project_category pc ON c.category_id = pc.category_id
      WHERE pc.project_id = $1
      ORDER BY c.category_name
    `;
    const result = await pool.query(query, [project_id]);
    return result.rows;
  } catch (error) {
    console.error('Error in getCategoriesByProjectId model:', error);
    throw error;
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  getProjectsByCategoryId,
  getCategoriesByProjectId
};