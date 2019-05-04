DROP TABLE IF EXISTS friends CASCADE;

CREATE TABLE friends(
    requester INTEGER,
    receiver INTEGER,
    status BOOLEAN NOT NULL
);
