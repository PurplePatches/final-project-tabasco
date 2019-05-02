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
    recipient_id VARCHAR(100) NOT NULL,
    sender_id VARCHAR(180) NOT NULL,
    friendship_status BOOL DEFAULT "f"
);

-- //id of requester
-- //id of reciepient
-- //boolean (by default is false
--
-- //create INSERT
-- //accept update
-- // cancel request or end request DELETE)
--
-- SELECT * FROM friends
-- WHERE ((recipient_id = $1 AND sender_id = $2)
-- OR (recipient_id = $2 AND sender_id = $1))
