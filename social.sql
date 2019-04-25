DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    bio TEXT,
    first VARCHAR(100),
    last VARCHAR(100),
    location VARCHAR(100)

);

