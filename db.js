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
