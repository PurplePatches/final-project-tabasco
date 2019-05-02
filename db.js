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
    let q = `SELECT id, firstname, lastname, useravatar
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
