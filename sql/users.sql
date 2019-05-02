DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    url VARCHAR,
    bio VARCHAR,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



UPDATE users
SET url = 'https://s3.amazonaws.com/socialnetworksabatini/3dDKt4bZaTCIm6T0U_YiSOFCLl9Bwbxq.jpg'
WHERE id = 1;
