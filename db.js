const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social-network"
);

exports.addUser = function(firstname, lastname, email, password) {
    const q = `INSERT INTO users (firstname, lastname, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id`;
    const params = [firstname, lastname, email, password];
    return db.query(q, params);
};

exports.loadUser = function(email) {
    const q = `SELECT id, email, password
    FROM users
    WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

exports.loadUserProfile = function(id) {
    const q = `SELECT id, firstname, lastname, useravatar, bio
    FROM users
    WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

exports.addAvatar = function addImage(id, url) {
    const q = `UPDATE users
            SET useravatar = $2
            WHERE id = $1
            RETURNING useravatar`;
    const params = [id, url];
    return db.query(q, params);
};

exports.uploadBio = function uploadBio(id, bio) {
    const q = `UPDATE users
    SET bio = $2
    WHERE id = $1;`;

    const params = [id, bio || null];
    return db.query(q, params);
};

exports.requestFriendship = function requestFriendship(
    sender_id,
    recipient_id,
    status
) {
    const q = `
    INSERT INTO friendships (sender_id, recipient_id, status)
    VALUES ($1, $2, $3)
    RETURNING *;`;
    const params = [sender_id, recipient_id, status];
    return db.query(q, params);
};

// exports.statusFriendship = function statusFriendship(userId) {
//     const q = `
//     SELECT sender_id, recipient_id, status FROM friendships
//     WHERE recipient_id = $1
//     `;
//     const params = [sender_id, recipient_id, status];
//     return db.query(q, params);
// };
exports.statusFriendship = function statusFriendship(sender_id, recipient_id) {
    const q = `
    SELECT status, recipient_id, sender_id FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (sender_id = $1 AND recipient_id = $2)`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

exports.acceptFriendship = function acceptFriendship(sender_id, recipient_id) {
    const q = `UPDATE friendships
    SET status = true
    WHERE (sender_id = $1 AND recipient_id = $2)
    OR (sender_id = $2 AND recipient_id = $1)`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

exports.cancelFriendship = function cancelFriendship(sender_id, recipient_id) {
    const q = `DELETE FROM friendships
    WHERE (sender_id = $1 AND recipient_id = $2)
    OR (sender_id = $2 AND recipient_id = $1)`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

exports.fetchUsers = function fetchUsers(userId) {
    const q = `
    SELECT users.id, firstname, lastname, useravatar, status, sender_id, recipient_id
    FROM friendships
    JOIN users
    ON (status = false AND recipient_id = $1 AND sender_id = users.id)
    OR (status = false AND sender_id = $1 AND recipient_id = users.id)
    OR (status = true AND recipient_id = $1 AND sender_id = users.id)
    OR (status = true AND sender_id = $1 AND recipient_id = users.id)
    `;
    const params = [userId];
    return db.query(q, params);
};
