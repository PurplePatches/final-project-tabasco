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