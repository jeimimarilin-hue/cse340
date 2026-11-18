-- Database setup and initial data population script

CREATE TABLE IF NOT EXISTS organization (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(150) NOT NULL,
    description TEXT,
    logo_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS project (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(150) NOT NULL,
    description TEXT,
    organization_id INT REFERENCES organization(organization_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS project_category (
    project_id INT REFERENCES project(project_id) ON DELETE CASCADE,
    category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- Insert initial organizations (preserving your logos and descriptions)
INSERT INTO organization (organization_name, description, logo_url) VALUES
('Community Care Network', 'Dedicated to supporting local communities through active engagement and outreach programs.', '/images/icon9.webp'),
('Youth Education Initiative', 'Empowering young students with academic tutoring, resources, and mentorship opportunities.', '/images/icon12.webp'),
('Green Earth Alliance', 'Fostering environmental sustainability through local clean-up drives and community workshops.', '/images/logo1.webp');

-- Insert initial categories
INSERT INTO category (category_name) VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

-- Insert initial projects linked to organizations
INSERT INTO project (project_name, description, organization_id) VALUES
('Tree Planting Initiative', 'Help us plant native trees in city parks.', 3),
('After-School Tutoring', 'Support students with primary school literacy and math.', 2),
('Campus Clean-Up Day', 'Help keep the university grounds clean and green.', 1);

-- Link projects and categories in the junction table
INSERT INTO project_category (project_id, category_id) VALUES
(1, 1), 
(2, 2), 
(3, 3);