DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userid SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    pic VARCHAR(255),
    bio VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE
);
