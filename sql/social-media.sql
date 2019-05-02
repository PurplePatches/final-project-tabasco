DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friendships;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(300) NOT NULL,
    lastname VARCHAR(300) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    image VARCHAR(300),
    bio VARCHAR(600)
);

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER,
    recipient_id INTEGER,
    status VARCHAR(100)
);
