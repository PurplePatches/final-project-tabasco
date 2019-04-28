DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    bio TEXT,
    dogname VARCHAR(100),
    dogbreed VARCHAR(100),
    first VARCHAR(100),
    last VARCHAR(100),
    location VARCHAR(100),
    created_at BIGINT
);

DROP TABLE IF EXISTS images;


CREATE TABLE images(
    imageid SERIAL PRIMARY KEY,
    url VARCHAR(300) NOT NULL,
    userid SERIAL REFERENCES users(userid) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255),
    description TEXT,
    created_at BIGINT,
    isProfile BOOLEAN
);