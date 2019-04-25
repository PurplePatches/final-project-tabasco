const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social"
);

function checkEmail(email) {
    let q = "SELECT COUNT(*) FROM users WHERE email = $1;";
    let params = [email];
    return db.query(q, params);
}

function addUser(first_name, last_name, email, password) {
    let q =
        "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id;";
    let params = [first_name, last_name, email, password];
    return db.query(q, params);
}

function getPass(email) {
    let q = "SELECT password, id FROM users WHERE email=($1);";
    let params = [email];
    return db.query(q, params);
}

module.exports = {
    checkEmail,
    addUser,
    getPass
};
