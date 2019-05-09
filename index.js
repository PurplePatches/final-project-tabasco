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
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080"
});
const cookieSessionMiddleware = cookieSession({
    secret: `french`,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 6
});

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

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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
    db.getFriendStatus(req.params.id, req.session.userId)
        .then(({ rows }) => {
            if (rows[0].status == "done") {
                res.json({ buttonState: "Unfriend" });
            } else if (
                rows[0].status == "pending" &&
                rows[0].sender_id == req.session.userId
            ) {
                res.json({ buttonState: "Cancel friend request" });
            } else if (
                rows[0].status == "pending" &&
                rows[0].sender_id == req.params.id
            ) {
                res.json({ buttonState: "Accept friend request" });
            }
        })
        .catch(() => {
            res.json({ buttonState: "Send a friend request" });
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
                            buttonState: "Send a friend request"
                        });
                    }
                );
            } else if (
                rows[0].status == "pending" &&
                rows[0].sender_id == req.params.id
            ) {
                db.updateFriendStatus(
                    req.session.userId,
                    req.params.id,
                    "done"
                ).then(({ rows }) => {
                    console.log(rows);
                    res.json({
                        buttonState: "Unfriend"
                    });
                });
            } else if (rows[0].status == "done") {
                db.deleteFriendStatus(req.session.userId, req.params.id).then(
                    () => {
                        res.json({
                            buttonState: "Send a friend request"
                        });
                    }
                );
            }
        })
        .catch(() => {
            db.createFriendStatus(
                req.session.userId,
                req.params.id,
                "pending"
            ).then(() => {
                res.json({
                    buttonState: "Cancel friend request"
                });
            });
        });
});

app.get("/api/friends", (req, res) => {
    db.retrieveFriends(req.session.userId).then(({ rows }) => {
        res.json(rows);
    });
});

app.post("/:id/friends/reject", (req, res) => {
    db.deleteFriendStatus(req.session.userId, req.params.id).then(() => {
        res.json({ success: true });
    });
});

app.post("/:id/friends/accept", (req, res) => {
    db.updateFriendStatus(req.session.userId, req.params.id, "done").then(
        () => {
            res.json({ success: true });
        }
    );
});

/////////LAST PART///////////////////////////
app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function() {
    console.log("I'm listening.");
});

let onlineUsers = {};

io.on("connection", socket => {
    if (!socket.request.session || !socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;
    onlineUsers[socket.id] = userId;

    db.getUsersbyIds(Object.values(onlineUsers)).then(({ rows }) => {
        socket.emit("onlineUsers", rows);
    });

    if (
        Object.values(onlineUsers).filter(
            userId => userId === socket.request.session.userId
        ).length === 1
    ) {
        db.getUserProfile(socket.request.session.userId).then(({ rows }) => {
            socket.broadcast.emit("userJoined", rows[0]);
        });
    }

    socket.on("disconnect", () => {
        delete onlineUsers[socket.id];
        io.emit("userLeft", socket.request.session.userId);
    });
    // socket.on("newChatMessage", data => {
    //     db.insertMessage(socket.request.session.userId).then(() => {
    //         db.retrieveUser(socket.request.session.userId).then(({ rows }) => {
    //             let myNewChat = {
    //                 firstname: rows[0].firstname,
    //                 lastname: rows[0].lastname,
    //                 chat: data,
    //                 id: socket.request.session.userId,
    //                 timestamp: rows[0].timestamp
    //             };
    //             socket.broadcast("chatMessageForRedux", myNewChat);
    //         });
    //     });
    // });
    // socket.emit("hey", {
    //     chicken: "funcky"
    // });
    // io.emit("newConnector", "another one!");

    socket.broadcast.emit("yo yo");
});
