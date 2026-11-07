import db from '../db.js';

export async function getAllCategories() {
    const query = 'SELECT * FROM category ORDER BY category_name ASC;';
    const result = await db.query(query);
    return result.rows;
}

export default {
    getAllCategories
};