const spicedPg = require("spiced-pg");

//const db = spicedPg("postgres:gianpaolob:tabasco@localhost:5432/petition");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

///USERS
exports.newUser = function newUser(firstName, lastName, email, password) {
    let q =
        "INSERT INTO users (first_name, last_name, email, password) VALUES ($1,$2,$3,$4) RETURNING id, first_name, last_name;";
    let params = [
        firstName || null,
        lastName || null,
        email || null,
        password || null
    ];
    return db.query(q, params);
};
exports.updateUser = function updateUser(firstName, lastName, email, userId) {
    let q = `UPDATE users SET first_name = $1, last_name = $2, email = $3
    WHERE id=$4`;
    let params = [firstName, lastName, email, userId];
    return db.query(q, params);
};
exports.removeUser = function removeUser(userId) {
    let q = `DELETE FROM users WHERE id=$1`;
    let params = [userId];
    return db.query(q, params);
};
exports.getUser = function getUser(userId) {
    let q = `SELECT * FROM users WHERE id=$1`;
    let params = [userId];
    return db.query(q, params);
};
exports.updateUserPwd = function updateUserPwd(
    firstName,
    lastName,
    email,
    password,
    userId
) {
    let q = `UPDATE users
            SET first_name = $1, last_name = $2, email = $3, password $4
            WHERE id=$5`;
    let params = [firstName, lastName, email, password, userId];
    return db.query(q, params);
};
exports.newPic = function newPic(url, userId) {
    let q = "UPDATE users SET image_url = $1 WHERE id=$2 RETURNING image_url";
    let params = [url, userId];
    return db.query(q, params);
};
exports.newPicHistory = function newPicHistory(url, userId) {
    let q =
        "INSERT INTO images (image_url, userId) VALUES ($1,$2) RETURNING image_url";
    let params = [url, userId];
    return db.query(q, params);
};
/////LOGIN
exports.userPassword = function userPassword(email) {
    let q = "SELECT * FROM users WHERE email = $1;";
    let params = [email];
    return db.query(q, params);
};
