CREATE TABLE IF NOT EXISTS category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS project (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(150) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS project_category (
    project_id INT REFERENCES project(project_id) ON DELETE CASCADE,
    category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO category (category_name) VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

INSERT INTO project (project_name, description) VALUES
('Campus Clean-Up Day', 'Help keep the university grounds clean and green.'),
('After-School Math Tutoring', 'Assist middle school students with basic algebra.'),
('Local Food Bank Drive', 'Collect and sort canned food for local families.');

INSERT INTO project_category (project_id, category_id) VALUES
(1, 1), -- Campus Clean-Up -> Environmental
(2, 2), -- Math Tutoring -> Educational
(3, 3); -- Food Bank Drive -> Community Service