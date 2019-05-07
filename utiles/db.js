const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

exports.createUser = function createUser(firstname, lastname, email, password) {
    let q = `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id`;
    let params = [firstname, lastname, email, password];
    return db.query(q, params);
};

exports.logIn = function logIn(email) {
    let q = `SELECT * FROM users WHERE email = $1`;
    let params = [email];
    return db.query(q, params);
};

exports.getUserProfile = function getUserProfile(userId) {
    let q = `SELECT firstname, lastname, image, id, bio FROM users WHERE id = $1`;
    let params = [userId];
    return db.query(q, params);
};

exports.addImage = function addImage(image, userId) {
    let q = `UPDATE users SET image = COALESCE(NULLIF($1, ''), image) WHERE id = $2 RETURNING image`;
    let params = [image, userId];
    return db.query(q, params);
};

exports.updateBio = function updateBio(bio, id) {
    let q = `UPDATE users SET bio = COALESCE(NULLIF($1, ''), bio) WHERE id = $2 RETURNING bio`;
    let params = [bio, id];
    return db.query(q, params);
};

exports.getOtherUser = function getOtherUser(id) {
    let q = `SELECT image, firstname, lastname, bio, id FROM users WHERE id = $1`;
    let params = [id];
    return db.query(q, params);
};

exports.getFriendStatus = function getFriendStatus(recipient_id, sender_id) {
    let q = `SELECT * FROM friendships
             WHERE recipient_id = $1 AND sender_id = $2
             OR recipient_id = $2 AND sender_id = $1`;
    let params = [recipient_id, sender_id];
    return db.query(q, params);
};

exports.updateFriendStatus = function updateFriendStatus(
    sender_id,
    recipient_id,
    status
) {
    let q = `UPDATE friendships SET status = $3
             WHERE (sender_id = $1 AND recipient_id = $2)
             OR (sender_id = $2 AND recipient_id = $1)
             RETURNING *`;
    let params = [sender_id, recipient_id, status];
    return db.query(q, params);
};

exports.createFriendStatus = function createFriendStatus(
    sender_id,
    recipient_id,
    status
) {
    let q = `INSERT INTO friendships (sender_id, recipient_id, status) VALUES ($1, $2, $3)`;
    let params = [sender_id, recipient_id, status];
    return db.query(q, params);
};

exports.deleteFriendStatus = function deleteFriendStatus(
    sender_id,
    recipient_id
) {
    let q = `DELETE FROM friendships
             WHERE sender_id = $1 AND recipient_id = $2
             OR sender_id = $2 AND recipient_id = $1`;
    let params = [sender_id, recipient_id];
    return db.query(q, params);
};

exports.retrieveFriends = function retrieveFriends(userId) {
    let q = `SELECT users.id, firstname, lastname, image, status, sender_id, recipient_id
            FROM friendships
            JOIN users
            ON (status = 'pending' AND recipient_id = $1 AND sender_id = users.id)
            OR (status = 'done' AND recipient_id = $1 AND sender_id = users.id)
            OR (status = 'pending' AND sender_id = $1 AND recipient_id = users.id)
            OR (status = 'done' AND sender_id = $1 AND recipient_id = users.id)`;
    let params = [userId];
    return db.query(q, params);
};
