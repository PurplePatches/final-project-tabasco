(function() {
    'use strict';

    const { app } = require('../index');
    const s3 = require('../s3');
    const config = require('../config');
    const db = require('./db');
    const multer = require('multer');
    const uidSafe = require('uid-safe');
    const path = require('path');
    const { userIsLoggedIn } = require('./auth');

    /////////////
    // MULTER //
    ///////////

    const diskStorage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, path.join(__dirname, '../uploads'));
        },
        filename: function(req, file, callback) {
            uidSafe(24).then(function(uid) {
                callback(null, uid + path.extname(file.originalname));
            });
        }
    });

    ///////////////
    // UPLOADER //
    /////////////

    const uploader = multer({
        storage: diskStorage,
        limits: {
            fileSize: 2097152
        }
    });

    app.post(
        '/upload',
        uploader.single('file'),
        s3.upload,
        userIsLoggedIn,
        (req, res) => {
            const url = config.s3Url + req.file.filename;
            db.uploadPicture(req.session.userId, url).then(data => {
                res.json(data.rows);
            });
        }
    );
})();
