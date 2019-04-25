var bcrypt = require("bcryptjs");

exports.hashPassword = function hashPassword(password) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
};

var bcrypt = require("bcryptjs");

exports.checkPassword = function checkPassword(newpassword, password) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(newpassword, password, function(err, doesMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
};
