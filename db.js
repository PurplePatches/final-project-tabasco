var spicedPg = require("spiced-pg");

// var db = spicedPg("postgres:postgres:pw@localhost:5432/petition");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres://postgres:pw@localhost:5432/socialnetwork"
);

exports.register = function register(first, last, email, password, url, bio) {
    let q = `INSERT INTO USERS (first, last, email, password, url, bio) VALUES ($1, $2, $3, $4, $5, $6) returning id`;
    let params = [first, last, email, password, url, bio];
    return db.query(q, params);
};

exports.retrievePassword = function retrievePassword(email) {
    let q = "SELECT * FROM users WHERE email = $1"; //how do I return the password from the table?
    let params = [email];
    return db.query(q, params);
};

exports.uploadPicture = function uploadPicture(id, url) {
    let q = "UPDATE users SET url = $2 WHERE id = $1 RETURNING url";
    let params = [id, url];
    return db.query(q, params);
};

exports.retrieveUser = function retrieveUser(id) {
    let q = "SELECT id, first, last, email, url, bio FROM users WHERE id = $1";
    let params = [id];
    return db.query(q, params);
};

exports.updateBio = function updateBio(id, bio) {
    let q = `UPDATE users SET bio = $2 WHERE id = $1 RETURNING bio`;
    let params = [id, bio];
    return db.query(q, params);
};

exports.askFriend = function askFriend(userId, otherId, boolean) {
    let q = `INSERT INTO friendship (sender_id, recipient_id, accepted) VALUES ($1, $2, $3) returning *`;
    let params = [userId, otherId, boolean];
    return db.query(q, params);
};

exports.checkFriend = function checkFriend(userId, otherId) {
    let q = `SELECT * FROM friendship
WHERE (recipient_id = $1 AND sender_id = $2)
OR (recipient_id = $2 AND sender_id = $1)`;
    let params = [userId, otherId];
    return db.query(q, params);
};

exports.retrieveFriends = function retrieveFriends(userId) {
    const q = `
        SELECT users.id, first, last, url, recipient_id, sender_id, accepted
        FROM friendship
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = false AND sender_id = $1 AND recipient_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
    `;
    let params = [userId];
    return db.query(q, params);
};

exports.deleteFriend = function deleteFriend(userId, otherId) {
    let q = `DELETE FROM friendship WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1)`;
    let params = [userId, otherId];
    return db.query(q, params);
};
exports.acceptFriend = function acceptFriend(userId, otherId, boolean) {
    let q = `UPDATE friendship SET accepted = $3 WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1) RETURNING *`;
    let params = [userId, otherId, boolean];
    return db.query(q, params);
};

exports.getUsersByIds = function getUsersByIds(arrayOfIds) {
    const query = `SELECT id, first, last, url FROM users WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds]);
};

exports.deleteUser = function deleteUser(userId) {
    const query = `DELETE FROM users WHERE id = $1`;
    return db.query(query, [userId]);
};

exports.deleteFriendships = function deleteFriendships(userId) {
    const query = `DELETE FROM friendship WHERE recipient_id = $1 OR sender_id = $1`;
    return db.query(query, [userId]);
};

exports.retrieveChatAuthors = function retrieveChatAuthors() {
    let q = `SELECT users.id, users.first, users.last, users.url, chat.message FROM users INNER JOIN chat ON users.id = chat.user_id ORDER BY
chat.id DESC LIMIT 10`;
    return db.query(q);
};

exports.retrieveChat = function retrieveChat() {
    const query = `SELECT * FROM chat ORDER BY
id DESC`;
    return db.query(query);
};

exports.insertMessage = function insertMessage(data, id) {
    const query = `INSERT INTO chat (message, user_id) VALUES($1, $2)`;
    return db.query(query, [data, id]);
};
