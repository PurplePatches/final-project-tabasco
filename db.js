var spicedPg = require("spiced-pg");

var dbUrl =
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres:postgres@localhost:5432/socialnetwork";

var db = spicedPg(dbUrl);

//((((((((((((((((((((((((((((((((((((((((      REGISTER     ))))))))))))))))))))))))))))))))))))))))

exports.addUsers = function addUsers(
    firstname,
    lastname,
    email,
    password,
    url,
    bio
) {
    let q =
        "INSERT INTO users (firstname, lastname, email, password, url, bio) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;";
    let params = [firstname, lastname, email, password, url, bio];
    return db.query(q, params);
};

exports.updateUsers = function updateUsers(url, id) {
    let q = `UPDATE users
    SET url = $1
    WHERE id = $2;`;

    let params = [url || null, id];
    return db.query(q, params);
};

exports.updateUsersBio = function updateUsers(bio, id) {
    let q = `UPDATE users
    SET bio = $1
    WHERE id = $2;`;

    let params = [bio || null, id];
    return db.query(q, params);
};

//((((((((((((((((((((((((((((((((((((((((((     LOGIN     ))))))))))))))))))))))))))))))))))))))))))

exports.getPassword = function getPassword(email) {
    let q = `SELECT password FROM users WHERE email = $1;`;
    let params = [email];
    return db.query(q, params);
};

//((((((((((((((((((((((((((((((((((((((((((     PROFILE     ))))))))))))))))))))))))))))))))))))))))))

exports.getUsersInformation = function getUsersInformation(userId) {
    let q = `SELECT * FROM users WHERE id = $1;`;
    let params = [userId];
    return db.query(q, params);
};

exports.insertImage = function insertImage(url, userid) {
    let q = `INSERT INTO images (url, userid) VALUES ($1, $2) RETURNING *;`;
    let params = [url, userid];
    return db.query(q, params);
};

//((((((((((((((((((((((((((((((((((((((((((     PROFILE     ))))))))))))))))))))))))))))))))))))))))))

exports.sendRequest = function sendRequest(requester_id, recipient_id, status) {
    let q = `INSERT INTO friendship (requester_id, recipient_id, status) VALUES ($1, $2, $3) RETURNING *;`;
    let params = [requester_id, recipient_id, status];
    return db.query(q, params);
};

exports.friendship = function friendship() {
    let q = `
    SELECT users.id, firstname, lastname, url, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND requester_id = users.id)
    OR (accepted = true AND recipient_id = $1 AND requester_id = users.id)
    OR (accepted = true AND requester_id = $1 AND recipient_id = users.id)`;
    let params = [];
    return db.query(q, params);
};
