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
exports.updateBio = function updateBio(bio, userId) {
    let q = "UPDATE users SET bio = $1 WHERE id=$2 RETURNING bio";
    let params = [bio, userId];
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

/////FriendshipS

exports.getFriends = function getFriends(userId) {
    const q = `
    SELECT users.id, first_name, last_name, image_url, status
    FROM friendships
    JOIN users
    ON (status = false AND id_recepient = $1 AND id_sender = users.id)
    OR (status = true AND id_recepient = $1 AND id_sender = users.id)
    OR (status = true AND id_sender = $1 AND id_recepient = users.id)
`;
    let params = [userId];
    return db.query(q, params);
};

exports.friendshipStatus = function friendshipStatus(userId, profileId) {
    let q = `SELECT * from friendships where
            (id_sender=$1 AND id_recepient=$2)
            OR(id_sender=$2 AND id_recepient=$1);`;
    let params = [userId, profileId];
    return db.query(q, params);
};
exports.sendFriendshipRequest = function sendFriendshipRequest(
    userId,
    profileId
) {
    let q =
        "INSERT INTO friendships (id_sender, id_recepient, status) VALUES ($1, $2, false) RETURNING * ";
    let params = [userId, profileId];
    return db.query(q, params);
};
exports.deleteFriendshipRequest = function deleteFriendshipRequest(
    userId,
    profileId
) {
    let q =
        "DELETE FROM friendships WHERE (id_sender = $1 AND id_recepient = $2) OR (id_sender = $2 AND id_recepient = $1) RETURNING * ";
    let params = [userId, profileId];
    return db.query(q, params);
};

exports.acceptFriendshipRequest = function acceptFriendshipRequest(
    userId,
    profileId
) {
    let q =
        "UPDATE friendships SET status = true WHERE id_sender = $2 AND id_recepient = $1 RETURNING * ";
    let params = [userId, profileId];
    return db.query(q, params);
};
/////LOGIN
exports.userPassword = function userPassword(email) {
    let q = "SELECT * FROM users WHERE email = $1;";
    let params = [email];
    return db.query(q, params);
};
////ONLINE users
exports.getUsersByIds = function getUsersByIds(arrayOfIds) {
    const query = `SELECT id, first_name, last_name, image_url FROM users WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds]);
};
exports.getNewUser = function getNewUser(id) {
    const query = `SELECT id, first_name, last_name, image_url FROM users WHERE id = $1`;
    return db.query(query, [id]);
};
