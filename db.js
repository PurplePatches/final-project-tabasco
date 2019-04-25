const spicedPg = require('spiced-pg');

const dbUrl = process.env.DATABASE_URL || 'postgres:postgres:postgres@localhost:5432/social';

const db = spicedPg(dbUrl);

//what error when username already taken?
exports.register = function (username, password) {
  const q = `INSERT INTO users (username, password) VALUES ($1, $2)
              ON CONFLICT (username) DO NOTHING
              RETURNING userid`
  const params = [ username, password ];
  return db.query(q, params)
}

exports.login = function (username) {
    return db.query(`SELECT password, userid FROM users WHERE username = '${username}'`)
}
