const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const passwords = require("./passwords");
const db = require("./db");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");
const config = require("./config.json");
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 yourapp.herokuapp.com:*"
});
console.log("HELLO IM CHECK");

app.use(compression());

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

const uploader = multer({
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
        secret: "10 reason why you should quit social media.",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(express.static("./public"));

///###########################################
///################## ONBOARDING ###############
///###########################################

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    passwords
        .hashPassword(password)
        .then(hash => {
            return db
                .addUser(firstname, lastname, email, hash)
                .then(results => {
                    req.session.userId = results.rows[0].id;
                    res.json({ scuccess: true });
                })
                .catch(err => {
                    console.log("error in register ", err);
                    res.json({ success: false });
                });
        })
        .catch(err => {
            console.log("hash", err);
            res.json({ success: false });
        });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.loadUser(email)
        .then(result => {
            if (result.rows.length == 0) {
                console.log("The login data is not matching any existing user");
                res.json({ success: false });
            }
            req.session.userId = result.rows[0].id;

            return passwords.compare(password, result.rows[0].password);
        })
        .then(result => {
            if (result) {
                // req.session.userId = result.rows[0].id;
                res.json({ success: true });
            } else {
                console.log("ERROR, wrong password!");
                res.json({ success: false });
            }
        })
        .catch(err => {
            console.log("ERROR", err);
        });
});

// app.get("/logout", (req, res) => {
//     req.session = null;
//     res.JSON(val);
// });

///###########################################
///################## USER DATA ###############
///###########################################
app.get("/user", (req, res) => {
    db.loadUserProfile(req.session.userId).then(results => {
        res.json(results.rows[0]);
    });
});

app.post("/uploadProfilePic", uploader.single("file"), s3.upload, function(
    req,
    res
) {
    const url = config.s3Url + req.file.filename;
    db.addAvatar(req.session.userId, url)
        .then(newImage => {
            res.json(newImage.rows[0]);
        })
        .catch(err => {
            console.log("Error in uploading", err);
        });
});

app.post("/bio", function(req, res) {
    let bio = req.body.bio;

    db.uploadBio(req.session.userId, bio)
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            console.log("ERROR in uploading bio", err);
        });
});

///###########################################
///################## OTHER USERS DATA ###############
///###########################################
app.get("/user/:id/json", (req, res) => {
    if (req.params.id == req.session.userId) {
        res.json({ redirect: true });
        return;
    }
    db.loadUserProfile(req.params.id)
        .then(results => {
            res.json(results.rows[0]);
        })
        .catch(err => {
            console.log("ERROR in loading profile", err);
        });
});

///###########################################
///################## USER TO USER ###############
///################## INTERACTION #################

app.get("/user/:id/friendship", (req, res) => {
    db.statusFriendship(req.session.userId, req.params.id)
        .then(results => {
            console.log("figuring out", results);
            if (results.rows[0]) {
                if (results.rows[0].status == true) {
                    res.json({
                        friendshipStatus: true,
                        recipient_id: req.params.id,
                        sender_id: req.session.userId
                    });
                } else if (results.rows[0].status == false) {
                    res.json({
                        friendshipStatus: false,
                        recipient_id: results.rows[0].recipient_id,
                        sender_id: results.rows[0].sender_id
                    });
                }
            } else {
                res.json({
                    friendshipStatus: undefined,
                    recipient_id: req.params.id,
                    sender_id: req.session.userId
                });
            }
        })
        .catch(err => {
            console.log("ERROR in get friend status", err);
        });
});

app.post("/user/:id/requestFriendship", (req, res) => {
    let status = false;
    db.requestFriendship(req.session.userId, req.params.id, status)
        .then(() => {
            res.json({
                friendshipStatus: false,
                recipient_id: req.params.id,
                sender_id: req.session.userId
            });
        })
        .catch(err => {
            console.log("ERROR in making friend request", err);
        });
});

app.post("/user/:id/deleteFriendship", (req, res) => {
    db.cancelFriendship(req.session.userId, req.params.id)
        .then(() => {
            res.json({
                friendshipStatus: undefined,
                recipient_id: req.params.id,
                sender_id: req.session.userId
            });
        })
        .catch(err => {
            console.log("ERROR in deleting friendship", err);
        });
});

app.post("/user/:id/acceptFriendship", (req, res) => {
    db.acceptFriendship(req.session.userId, req.params.id)
        .then(() => {
            res.json({
                friendshipStatus: true,
                recipient_id: req.params.id,
                sender_id: req.session.userId
            });
        })
        .catch(err => {
            console.log("ERROR in deleting friendship", err);
        });
});

app.post("/user/:id/cancelFriendship", (req, res) => {
    db.cancelFriendship(req.session.userId, req.params.id)
        .then(() => {
            res.json({
                friendshipStatus: undefined,
                recipient_id: req.params.id,
                sender_id: req.session.userId
            });
        })
        .catch(err => {
            console.log("ERROR in deleting friendship", err);
        });
});

app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function() {
    console.log("I'm listening on 8080.");
});

///############################ SOCKET #########
///###########################################
///###########################################
//
// let onlineUsers = {};
//
// io.on("connection", socket => {
//
//        onlineUsers[socket.id] = socket.request.sessions.userId
//        onlinerUsers[socket.id] = otherUserId
//
//
//  db.getUsersByIds(
//     Object.values(onlineUsers)).then(({rows}) { socket.emit("olineUsers, rows");})
// )
//
// socket.on("disconnect", () => {
//     console.log(`socket with the id ${socket.id} is now disconnected`);
// });
//     socket.emmit("EVENT", {
//         key: "this is socket test"
//     });
//     socket.on("ANSWER", data => console.log(data
//
//     io.emit("newConncetor", "another connection"));)
//     //target all except one
//     socket.broadcast.emit
//
//     delete online USers[socket.id]
// });
