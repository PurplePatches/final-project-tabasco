DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friendship;
DROP TABLE IF EXISTS chat;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(255),
    last VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    url VARCHAR(300),
    bio VARCHAR(1000)
);

CREATE TABLE friendship (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    recipient_id INTEGER NOT NULL,
    accepted BOOLEAN
);

CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    message VARCHAR(1000),
    user_id INTEGER NOT NULL
);
