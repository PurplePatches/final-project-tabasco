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
    let q = "SELECT password, id FROM users WHERE email = ($1);";
    let params = [email];
    return db.query(q, params);
}

function getUserData(id) {
    let q =
        "SELECT id, first_name, last_name, picture, bio FROM users WHERE id = $1;";
    let params = [id];
    return db.query(q, params);
}

function changePic(id, picture) {
    let q = "UPDATE users SET picture = $2 WHERE id = $1 RETURNING picture;";
    let params = [id, picture];
    return db.query(q, params);
}

function editBio(id, bio) {
    let q = "UPDATE users SET bio = $2 WHERE id = $1 RETURNING bio;";
    let params = [id, bio];
    return db.query(q, params);
}

function getOtherDetails(id) {
    const q =
        "SELECT first_name, last_name, picture, bio FROM users WHERE id=$1;";
    const params = [id];
    return db.query(q, params);
}

function getFriendship(currentUser, otherUser) {
    const q =
        "SELECT * FROM friends WHERE requester=$1 AND receiver=$2 OR requester=$2 AND receiver=$1;";
    const params = [currentUser, otherUser];
    return db.query(q, params);
}

function friendRequest(currentUser, otherUser) {
    const q =
        "INSERT INTO friends (requester, receiver, status) VALUES ($1, $2, false);";
    const params = [currentUser, otherUser];
    return db.query(q, params);
}

function friendAccept(currentUser, otherUser) {
    const q =
        "UPDATE friends SET status=true WHERE requester=$1 AND receiver=$2 OR requester=$2 AND receiver=$1;";
    const params = [currentUser, otherUser];
    return db.query(q, params);
}

function unfriend(currentUser, otherUser) {
    const q =
        "DELETE FROM friends WHERE requester=$1 AND receiver=$2 OR requester=$2 AND receiver=$1;";
    const params = [currentUser, otherUser];
    return db.query(q, params);
}

function getFriends(currentUser) {
    const q =
        "SELECT users.id, first_name, last_name, picture, status FROM friends JOIN users ON (status = false AND receiver = $1 AND requester = users.id) OR (status = true AND receiver = $1 AND requester = users.id) OR (status = true AND requester = $1 AND receiver = users.id);";
    const params = [currentUser];
    return db.query(q, params);
}

function getUsersByIds(arrayOfIds) {
    const q = `SELECT id, first_name, last_name, picture FROM users WHERE id = ANY($1)`;
    return db.query(q, [arrayOfIds]);
}

function getChat() {
    console.log("getChat is running");
    const q =
        "SELECT chat.id AS chatId, userId, message, posted, first_name, last_name FROM chat JOIN users ON chat.userId = users.id ORDER BY chatId DESC LIMIT 10;";
    return db.query(q);
}

function addChat(userId, message) {
    const q =
        "INSERT INTO chat (userId, message) VALUES ($1, $2) RETURNING id, posted;";
    const params = [userId, message];
    return db.query(q, params);
}

module.exports = {
    checkEmail,
    addUser,
    getPass,
    getUserData,
    changePic,
    editBio,
    getOtherDetails,
    getFriendship,
    friendRequest,
    friendAccept,
    unfriend,
    getFriends,
    getUsersByIds,
    getChat,
    addChat
};
