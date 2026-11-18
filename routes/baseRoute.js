const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController');

// Home route
router.get('/', baseController.buildHome);

// Organizations routes
router.get('/organizations', baseController.buildOrganizations);
router.get('/organization/:id', baseController.buildOrganizationDetail);

// Projects routes
router.get('/projects', baseController.buildProjects);
router.get('/project/:id', baseController.buildProjectDetail);

// Categories routes
router.get('/categories', baseController.buildCategories);
router.get('/categories/:id', baseController.buildCategoryDetail);

module.exports = router;