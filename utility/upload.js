(function() {
    "use strict";

    const { app } = require("../index");
    const s3 = require("../s3");
    const config = require("../config");
    const db = require("./db");
    const multer = require("multer");
    const uidSafe = require("uid-safe");
    const path = require("path");

    /////////////
    // MULTER //
    ///////////

    const diskStorage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, __dirname + "/uploads");
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

    // copied from imageboard, not conifgured yet

    app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
        const url = config.s3Url + req.file.filename;
        db.insertIntoDatabase(
            req.body.title,
            req.body.description,
            req.body.username,
            url
        ).then(data => {
            res.json(data.rows);
        });
    });
})();
