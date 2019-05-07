const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social-network"
);

exports.addUser = function(firstname, lastname, email, password) {
    let q = `INSERT INTO users (firstname, lastname, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id`;
    let params = [firstname, lastname, email, password];
    return db.query(q, params);
};

exports.loadUser = function(email) {
    let q = `SELECT id, email, password
    FROM users
    WHERE email = $1`;
    let params = [email];
    return db.query(q, params);
};

exports.loadUserProfile = function(id) {
    let q = `SELECT id, firstname, lastname, useravatar, bio
    FROM users
    WHERE id = $1`;
    let params = [id];
    return db.query(q, params);
};

exports.addAvatar = function addImage(id, url) {
    let q = `UPDATE users
            SET useravatar = $2
            WHERE id = $1
            RETURNING useravatar`;
    let params = [id, url];
    return db.query(q, params);
};

exports.uploadBio = function uploadBio(id, bio) {
    let q = `UPDATE users
    SET bio = $2
    WHERE id = $1;`;

    let params = [id, bio || null];
    return db.query(q, params);
};

exports.requestFriendship = function requestFriendship(
    sender_id,
    recipient_id,
    status
) {
    let q = `
    INSERT INTO friendships (sender_id, recipient_id, status)
    VALUES ($1, $2, $3)
    RETURNING *;`;
    let params = [sender_id, recipient_id, status];
    return db.query(q, params);
};

exports.statusFriendship = function statusFriendship(sender_id, recipient_id) {
    let q = `
    SELECT status, recipient_id, sender_id FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (sender_id = $1 AND recipient_id = $2)`;
    let params = [sender_id, recipient_id];
    return db.query(q, params);
};

exports.deleteFriendship = function deleteFriendship(sender_id, recipient_id) {
    `
    DELETE FROM friendships
    WHERE sender_id = $1 || recipient_id = $2`;
    return db.query(params);
};

exports.cancelFriendship = function cancelFriendship(sender_id, recipient_id) {
    let q = `DELETE FROM friendship
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1)`;
    return db.query(params);
};
