CREATE TABLE IF NOT EXISTS category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS project_category (
    project_id INT REFERENCES project(project_id) ON DELETE CASCADE,
    category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO category (category_name) VALUES
('Education'),
('Environment'),
('Community Outreach');

INSERT INTO project_category (project_id, category_id) VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 3);