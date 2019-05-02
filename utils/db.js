var spicedPg = require("spiced-pg");
var db =
    process.env.DATABASE_URL ||
    spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");
// var db = spicedPg(dbUrl);

exports.register = function(first_name, last_name, email, password) {
    let q = `INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id, first_name, last_name, email, password`;
    let params = [first_name, last_name, email, password];
    return db.query(q, params);
};

exports.login = function(email) {
    let q = `SELECT * FROM users
    WHERE email = $1;`;
    return db.query(q, [email]);
};

exports.getUserInfo = function(id) {
    let q = `SELECT * FROM users
    WHERE id = $1`;
    return db.query(q, [id]);
};

exports.uploadImage = function(image, id) {
    let q = `UPDATE users SET image = $1
    WHERE id = $2`;
    let params = [image, id];
    return db.query(q, params);
};

exports.uploadBio = function(bio, id) {
    let q = `UPDATE users SET bio = $1
    WHERE id = $2`;
    let params = [bio, id];
    return db.query(q, params);
};
