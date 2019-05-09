DROP TABLE IF EXISTS chat;

CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    comment TEXT,
    url VARCHAR,
    userId INTEGER,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- db.getUserChat().then(results => {
--     socket.emit('chatMessages', results)
--     })
--
--
-- getUserChat should join both tables (users and chat) to take the information
