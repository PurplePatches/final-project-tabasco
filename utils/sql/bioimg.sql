DROP TABLE IF EXISTS user_meta;

CREATE TABLE user_meta (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255),
    bio VARCHAR(255),
    userId INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (userId) REFERENCES users(id)
    ON DELETE CASCADE
);
