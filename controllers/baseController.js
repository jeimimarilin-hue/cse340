const categoryModel = require('../models/categories');
const projectModel = require('../models/projects');
const orgModel = require('../models/organizations');

/* *********************************-----------------
 * Deliver default home view
 **************************************************** */
const buildHome = async (req, res) => {
  res.render('index', { title: 'Home' });
};

/* *********************************-----------------
 * Deliver organizations view
 **************************************************** */
const buildOrganizations = async (req, res) => {
  try {
    const organizations = await orgModel.getAllOrganizations();
    res.render('organizations', { 
      title: 'Organizations', 
      organizations 
    });
  } catch (error) {
    console.error('Error building organizations view:', error);
    res.status(500).render('error', { title: '500 Error', message: 'Internal Server Error' });
  }
};

/* *********************************-----------------
 * Deliver organization details view
 **************************************************** */
const buildOrganizationDetail = async (req, res) => {
  try {
    const orgId = req.params.id;
    const organization = await orgModel.getOrganizationById(orgId);
    const projects = await orgModel.getProjectsByOrganizationId(orgId);
    
    if (!organization) {
      return res.status(404).render('error', { title: '404 Not Found', message: 'Organization not found' });
    }

    res.render('organizationDetail', {
      title: organization.organization_name,
      organization,
      projects
    });
  } catch (error) {
    console.error('Error building organization detail view:', error);
    res.status(500).render('error', { title: '500 Error', message: 'Internal Server Error' });
  }
};

/* *********************************-----------------
 * Deliver projects view
 **************************************************** */
const buildProjects = async (req, res) => {
  try {
    const projects = await projectModel.getAllProjects();
    res.render('projects', { 
      title: 'Service Projects', 
      projects 
    });
  } catch (error) {
    console.error('Error building projects view:', error);
    res.status(500).render('error', { title: '500 Error', message: 'Internal Server Error' });
  }
};

/* *********************************-----------------
 * Deliver project details view (with categories and organization tags)
 **************************************************** */
const buildProjectDetail = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await projectModel.getProjectById(projectId);
    const categories = await projectModel.getCategoriesByProjectId(projectId);

    if (!project) {
      return res.status(404).render('error', { title: '404 Not Found', message: 'Project not found' });
    }

    res.render('projectDetail', {
      title: project.project_name,
      project,
      categories
    });
  } catch (error) {
    console.error('Error building project detail view:', error);
    res.status(500).render('error', { title: '500 Error', message: 'Internal Server Error' });
  }
};

/* *********************************-----------------
 * Deliver categories view
 **************************************************** */
const buildCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories();
    res.render('categories', { 
      title: 'Categories', 
      categories 
    });
  } catch (error) {
    console.error('Error building categories view:', error);
    res.status(500).render('error', { title: '500 Error', message: 'Internal Server Error' });
  }
};

/* *********************************-----------------
 * Deliver category details view (projects in this category)
 **************************************************** */
const buildCategoryDetail = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryModel.getCategoryById(categoryId);
    const projects = await projectModel.getProjectsByCategoryId(categoryId);

    if (!category) {
      return res.status(404).render('error', { title: '404 Not Found', message: 'Category not found' });
    }

    res.render('categoryDetail', {
      title: category.category_name,
      category,
      projects
    });
  } catch (error) {
    console.error('Error building category detail view:', error);
    res.status(500).render('error', { title: '500 Error', message: 'Internal Server Error' });
  }
};

module.exports = {
  buildHome,
  buildOrganizations,
  buildOrganizationDetail,
  buildProjects,
  buildProjectDetail,
  buildCategories,
  buildCategoryDetail
};