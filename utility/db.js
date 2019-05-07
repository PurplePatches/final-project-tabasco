(function() {
    "use strict";

    const spicedPg = require("spiced-pg");
    const db = spicedPg(
        process.env.DATABASE_URL ||
            "postgres:postgres:postgres@localhost:5432/social-network"
    );

    ////////////////////
    // REGISTER USER //
    //////////////////

    exports.registerInfo = function registerInfo(
        first_name,
        last_name,
        email_address,
        password
    ) {
        let query = `
        INSERT INTO users (
            first_name,
            last_name,
            email_address,
            password
        )
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

    ////////////////////
    // GET PASSWORD  //
    //////////////////

    exports.getHashedPassword = function getHashedPassword(email_address) {
        let query = `SELECT password, id
        FROM users
        WHERE email_address = $1`;
        let parameters = [email_address || null];
        return db.query(query, parameters);
    };

    /////////////////////
    // UPLOAD PICTURE //
    ///////////////////

    exports.uploadPicture = function uploadPicture(id, user_picture) {
        let query = `UPDATE users
        SET user_picture = $2
        WHERE id = $1
        RETURNING *`;
        let parameters = [id || null, user_picture || null];
        return db.query(query, parameters);
    };

    ///////////////////////////
    // GET USER INFORMATION //
    /////////////////////////

    exports.getUserInformation = function getUserInformation(id) {
        let query = `SELECT *
        FROM users
        WHERE id = $1;`;
        let parameters = [id || null];
        return db.query(query, parameters);
    };

    /////////////////
    // UPDATE BIO //
    ///////////////

    exports.updateBio = function updateBio(id, bio) {
        let query = `UPDATE users
        SET bio = $2
        WHERE id = $1
        RETURNING bio;`;
        let parameters = [id || null, bio || null];
        return db.query(query, parameters);
    };

    /////////////////////////////
    // GET FRIEND INFORMATION //
    ///////////////////////////

    exports.getFriends = function(user_id) {
        const query = `SELECT
        id_sender, id_recipient, request_accepted, accepted_on,
        users.id as id, first_name, last_name, user_picture
        FROM friends
        JOIN users
        ON users.id = CASE
        WHEN id_sender = $1
        THEN id_recipient
        ELSE id_sender
        END
        WHERE (id_sender = $1 AND request_accepted = true)
        OR (id_recipient = $1)`;
        const parameters = [user_id];
        return db.query(query, parameters).then(result => {
            return result.rows;
        });
    };

    //////////////////////////
    // SEND FRIEND REQUEST //
    /////////////////////////

    exports.sendFriendRequest = function(id_sender, id_recipient) {
        const q = `INSERT INTO friends (
            id_sender,
            id_recipient,
            request_accepted)
        VALUES ($1, $2, false)`;
        const params = [id_sender, id_recipient];
        return db.query(q, params);
    };
})();
