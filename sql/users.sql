DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL CHECK (first_name <> ''),
    last_name VARCHAR(100) NOT NULL CHECK (last_name <> ''),
    email VARCHAR(100) NOT NULL UNIQUE CHECK (email <> ''),
    password VARCHAR(100) NOT NULL CHECK (password <> ''),
    avatar TEXT CHECK (avatar <> ''),
    bio VARCHAR (500) CHECK (bio <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
