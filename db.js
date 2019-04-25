var spicedPg = require("spiced-pg");

var dbUrl =
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres:postgres@localhost:5432/socialnetwork";

var db = spicedPg(dbUrl);

//((((((((((((((((((((((((((((((((((((((((      REGISTER     ))))))))))))))))))))))))))))))))))))))))

exports.addUsers = function addUsers(firstname, lastname, email, password) {
    let q =
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *;";
    let params = [firstname, lastname, email, password];
    return db.query(q, params);
};

//((((((((((((((((((((((((((((((((((((((((((     LOGIN     ))))))))))))))))))))))))))))))))))))))))))

exports.getPassword = function getPassword(email) {
    let q = `SELECT password FROM users WHERE email = $1;`;
    let params = [email];
    return db.query(q, params);
};
