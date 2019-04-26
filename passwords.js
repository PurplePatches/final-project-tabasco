const bcrypt = require("bcryptjs");
const HASH_STRENGTH = 10;

exports.hashPassword = function(plainPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.hash(plainPassword, HASH_STRENGTH, (err, hash) => {
            if (err) {
                return reject(err);
            }
            resolve(hash);
        });
    });
};

exports.compare = function(plain, hash) {
    return bcrypt.compare(plain, hash);
};
