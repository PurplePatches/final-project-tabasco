DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(180) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    password TEXT,
    useravatar TEXT,
    bio TEXT
);

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    sender_id VARCHAR(100) NOT NULL,
    recipient_id VARCHAR(180) NOT NULL,
    status BOOLEAN
);
