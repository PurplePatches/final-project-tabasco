(function() {
    "use strict";

    const spicedPg = require("spiced-pg");
    const db = spicedPg(
        process.env.DATABASE_URL ||
            "postgres:postgres:postgres@localhost:5432/social-network"
    );

    exports.registerInfo = function registerInfo(
        first_name,
        last_name,
        email_address,
        password
    ) {
        let query = `INSERT INTO users (first_name, last_name, email_address, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id;`;
        let parameters = [
            first_name || null,
            last_name || null,
            email_address || null,
            password || null
        ];
        return db.query(query, parameters);
    };

    exports.getHashedPassword = function getHashedPassword(email_address) {
        let query = `SELECT password, id
        FROM users
        WHERE email_address = $1`;
        let parameters = [email_address || null];
        return db.query(query, parameters);
    };

    // exports.getUserInformation = function getUserInformation(user_id) {
    //     let query = `SELECT first_name, last_name, email_address, age, city, url
    //     FROM users
    //     LEFT JOIN user_profiles
    //     ON users.id = user_profiles.user_id
    //     WHERE users.id = $1;`;
    //     let params = [user_id || null];
    //     return db.query(query, params);
    // };
})();
