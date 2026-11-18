const pool = require('../db');

/* *********************************-----------------
 * Get all organizations from the database
 **************************************************** */
const getAllOrganizations = async () => {
  try {
    const result = await pool.query('SELECT * FROM organization ORDER BY organization_name');
    return result.rows;
  } catch (error) {
    console.error('Error in getAllOrganizations model:', error);
    throw error;
  }
};

/* *********************************-----------------
 * Get a single organization by its ID
 **************************************************** */
const getOrganizationById = async (organization_id) => {
  try {
    const result = await pool.query('SELECT * FROM organization WHERE organization_id = $1', [organization_id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error in getOrganizationById model:', error);
    throw error;
  }
};

/* *********************************-----------------
 * Get all service projects belonging to a specific organization
 **************************************************** */
const getProjectsByOrganizationId = async (organization_id) => {
  try {
    const result = await pool.query('SELECT * FROM project WHERE organization_id = $1 ORDER BY project_name', [organization_id]);
    return result.rows;
  } catch (error) {
    console.error('Error in getProjectsByOrganizationId model:', error);
    throw error;
  }
};

module.exports = {
  getAllOrganizations,
  getOrganizationById,
  getProjectsByOrganizationId
};