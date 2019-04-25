var spicedPg = require("spiced-pg");

// var db = spicedPg("postgres:postgres:pw@localhost:5432/petition");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres://postgres:pw@localhost:5432/socialnetwork"
);

exports.register = function register(first, last, email, password) {
    let q = `INSERT INTO USERS (first, last, email, password) VALUES ($1, $2, $3, $4) returning id`;
    let params = [first, last, email, password];
    return db.query(q, params);
};

exports.retrievePassword = function retrievePassword(email) {
    let q = "SELECT * FROM users WHERE email = $1"; //how do I return the password from the table?
    let params = [email];
    return db.query(q, params);
};

// exports.retrieveID = function retrieveID(email) {
//     let q = "SELECT id FROM users WHERE email = $1";
//     let params = [email];
//     return db.query(q, params);
// };
