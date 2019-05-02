const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const bcrypt = require("./utiles/bcrypt");
const db = require("./utiles/db");
const body = require("body-parser");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3.js");
const config = require("./config.json");
const path = require("path");

app.use(compression());

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(
    cookieSession({
        secret: `french`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(body.urlencoded({ extended: false }));
app.use(body.json());

app.use(express.static("./public"));
/////////FIRST PART//////////////////////////
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    bcrypt
        .hashPassword(req.body.password)
        .then(hashedPassword => {
            db.createUser(
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hashedPassword
            )
                .then(id => {
                    req.session.userId = id.rows[0].id;
                    res.json(id.rows[0]);
                })
                .catch(() => {
                    res.json({ usedEmail: true });
                });
        })
        .catch(() => {
            res.json({ error: true });
        });
});

app.post("/login", (req, res) => {
    db.logIn(req.body.email)
        .then(data => {
            bcrypt
                .checkPassword(req.body.password, data.rows[0].password)
                .then(match => {
                    if (!match) {
                        res.json({ wrongPassword: true });
                    } else {
                        req.session.userId = data.rows[0].id;
                        res.json(data);
                    }
                });
        })
        .catch(() => {
            res.json({ wrongEmail: true });
        });
});

app.get("/user", (req, res) => {
    db.getUserProfile(req.session.userId)
        .then(userData => {
            res.json(userData.rows[0]);
        })
        .catch(() => {
            res.json({ error: true });
        });
});

app.post("/uploadPic", uploader.single("file"), s3.upload, function(req, res) {
    const url = config.s3Url + req.file.filename;
    db.addImage(url, req.session.userId)
        .then(newImage => {
            res.json(newImage.rows[0]);
        })
        .catch(() => {
            res.json({ error: true });
        });
});

app.post("/updateBio", (req, res) => {
    db.updateBio(req.body.bio, req.session.userId).then(results => {
        res.json(results.rows[0]);
    });
});

app.get("/api/user/:id", (req, res) => {
    db.getOtherUser(req.params.id)
        .then(({ rows }) => {
            if (rows[0].id == req.session.userId) {
                res.json({ redirect: true });
            } else {
                res.json(rows[0]);
            }
        })
        .catch(() => {
            res.json({ redirect: true });
        });
});

app.get("/:id/friend-button", (req, res) => {
    console.log(req.session.userId, req.params.id);
    db.getFriendStatus(req.params.id, req.session.userId)
        .then(({ rows }) => {
            console.log(rows[0]);
            if (rows[0].status == "friends") {
                res.json({ friends: true });
            } else if (
                rows[0].status == "pending" &&
                rows[0].sender_id == req.session.userId
            ) {
                res.json({ sentFriendRequest: true });
            } else if (
                rows[0].status == "pending" &&
                rows[0].sender_id == req.params.id
            ) {
                res.json({ receivedFriendRequest: true });
            }
        })
        .catch(() => {
            res.json({ notFriends: true });
        });
});

app.post("/:id/friend-button", (req, res) => {
    db.getFriendStatus(req.params.id, req.session.userId)
        .then(({ rows }) => {
            if (
                rows[0].status == "pending" &&
                rows[0].sender_id == req.session.userId
            ) {
                db.deleteFriendStatus(req.session.userId, req.params.id).then(
                    () => {
                        res.json({
                            friends: false,
                            notFriends: true,
                            receivedFriendRequest: false,
                            sentFriendRequest: false
                        });
                    }
                );
            } else if (
                rows[0].status == "pending" &&
                rows[0].sender_id == req.params.id
            ) {
                db.updateFriendStatus(
                    req.session.userId,
                    req.body.recipient_id,
                    req.body.status
                ).then(() => {
                    res.json({
                        friends: true,
                        notFriends: false,
                        receivedFriendRequest: false,
                        sentFriendRequest: false
                    });
                });
            }
        })
        .catch(() => {
            db.createFriendStatus(
                req.session.userId,
                req.params.id,
                "pending"
            ).then(() => {
                res.json({
                    friends: false,
                    notFriends: false,
                    receivedFriendRequest: false,
                    sentFriendRequest: true
                });
            });
        });
});
/////////LAST PART///////////////////////////
app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
