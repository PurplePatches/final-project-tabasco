DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(300) NOT NULL,
    lastname VARCHAR(300) NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    image VARCHAR(300) 
)
