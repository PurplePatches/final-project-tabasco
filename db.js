const spicedPg = require('spiced-pg');

const dbUrl = process.env.DATABASE_URL || 'postgres:postgres:postgres@localhost:5432/social';

const db = spicedPg(dbUrl);

//what error when username already taken?
exports.register = function (email, password) {
  const created_at = Date.now()
  const q = `INSERT INTO users (email, password, created_at) VALUES ($1, $2, $3)
              ON CONFLICT (email) DO NOTHING
              RETURNING userid`
  const params = [ email, password, created_at ];
  return db.query(q, params)
}

exports.login = function (email) {
    return db.query(`SELECT password, userid FROM users WHERE email = '${email}'`)
}

exports.updateProfile = function ({first, last, dogname, dogbreed, bio, location}, userid) {
  const q = `UPDATE
  users
SET
  first = $1, last = $2, dogname = $3, dogbreed =$4, bio = $5, location = $6
WHERE
  userid = ${userid}
`
  const params = [ first, last, dogname, dogbreed, bio, location ];
  return db.query(q, params)
}

exports.getProfile = function (userid) {
  return db.query(`SELECT * FROM users WHERE userid = ${userid}`)
}

exports.saveImage = function (url, userid) {
  const created_at = Date.now()
  const q = `INSERT INTO images (url, userid, created_at) VALUES ($1, $2, $3)`
  const params = [ url, userid, created_at ];
  return db.query(q, params)
}

exports.getImages = function (userid) {
  return db.query(`SELECT * FROM images WHERE userid = ${userid}`)
}

exports.newFriendRequest = (requester, requested) => {
  const created_at = Date.now()
  const q = `INSERT INTO relations (requester, requested, created_at, friends) 
    VALUES ($1, $2, $3, $4)
    RETURNING relationid
    `
  const params = [ requester, requested, created_at, false];
  return db.query(q, params)
}

exports.revokeFriendRequest = (requester, requested) => {
  const created_at = Date.now()
  const q = `DELETE FROM relations WHERE requester = $1 AND requested = $2
    `
  const params = [ requester, requested];
  return db.query(q, params)
}

exports.acceptFriendRequest = (requester, requested) => {
  const q = `UPDATE relations (friends) VALUES ($3)
    WHERE requester = $1 AND requested = $2
    `
const params = [ requester, requested, true];
return db.query(q, params)
}

exports.getFriendStatus = (requester, requested) => {
  console.log(requester, requested);
  
  return db.query(`SELECT * FROM relations 
    WHERE (requester = ${requester} AND requested = ${requested})
    OR (requested = ${requester} AND requester = ${requested})
    `)
}

exports.updatePasswordEmail = function (userid, email, password) {
  if(password){
      const q = `UPDATE
          users
        SET
          email = $1, password = $2
        WHERE
          userid = ${userid}
        `
          const params = [ email, password];
          return db.query(q, params)
  }else{
    const q = `UPDATE
        users
      SET
        email = $1
      WHERE
        userid = ${userid}
      `
    const params = [ email];
    return db.query(q, params)
  }
  

}