DROP TABLE IF EXISTS images;

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    current BOOLEAN,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
    ON DELETE CASCADE
);
