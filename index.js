const express = require("express");
const app = express();
const ca = require("chalk-animation");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 bear-book.herokuapp.com:*"
});
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const db = require("./utils/db");
const bc = require("./utils/bc");
var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");
const s3 = require("./utils/s3");
const config = require("./config.json");
const { isLoggedIn, isLoggedOut } = require("./utils/middleware");

const compression = require("compression");

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (request, response) =>
        response.sendFile(`${__dirname}/bundle.js`)
    );
}
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
app.use(express.static(__dirname + "/public"));

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(csurf());
app.use((request, response, next) => {
    response.cookie("mytoken", request.csrfToken());
    next();
});

app.get("/logout", (request, response) => {
    request.session = null;
    response.redirect("/welcome");
});
app.get("/welcome", (request, response) => {
    if (request.session.userId) {
        response.redirect("/");
    } else {
        response.sendFile(__dirname + "/index.html");
    }
});
app.post("/register", (request, response) => {
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let email = request.body.email;
    console.log("before hashing the password", request.body);
    bc.hashPassword(request.body.password)
        .then(pwd => {
            request.session.firstName = firstName;
            request.session.lastName = lastName;
            console.log("Checking the First name in Registration", firstName);
            return db.newUser(firstName, lastName, email, pwd).then(data => {
                request.session.userId = data.rows[0].id;
                response.json(data.rows);
            });
        })
        .catch(err => {
            console.log("Error in post register", err);
            response.json({ error: err.message });
        });
});
app.post("/bio", (request, response) => {
    let userId = request.session.userId;
    let bio = request.body.bio;
    console.log("POST BIO ABOUT TO HAPPEN", bio);
    db.updateBio(bio, userId)
        .then(({ rows }) => {
            response.json(rows[0]);
            console.log(rows[0]);
        })
        .catch(err => {
            console.log("Problem in the Bio", err);
        });
});
app.post("/upload", uploader.single("file"), s3.upload, (request, response) => {
    // If nothing went wrong the file is already in the uploads directory
    const url = config.s3Url + request.file.filename;
    db.newPic(url, request.session.userId)
        .then(({ rows }) => {
            console.log("upload completed", rows[0]);
            db.newPicHistory(url, request.session.userId).then(({ rows }) => {
                console.log("upload completed in the image table", rows[0]);
                response.json(rows[0]);
            });
        })
        .catch(err => {
            console.log("Can't upload the pic man!", err);
        });
});
app.get("/login", (request, response) => {
    if (request.session.userId) {
        response.redirect("/");
    } else {
        response.sendFile(__dirname + "/index.html");
    }
});
app.post("/login", (request, response) => {
    db.userPassword(request.body.email)
        .then(user => {
            bc.checkPassword(request.body.password, user.rows[0].password).then(
                data => {
                    if (data) {
                        request.session.userId = user.rows[0].id;
                        console.log("LOGGED IN");
                        response.json(data);
                    } else {
                        throw new Error("Whoops!");
                    }
                }
            );
        })
        .catch(err => {
            console.log("LOGIN ", err);
            response.json({ error: err.message });
        });
});
app.get("/user", (request, response) => {
    if (request.session.userId) {
        db.getUser(request.session.userId).then(({ rows }) => {
            response.json(rows);
        });
    }
});
app.get("/user/:id/json", (request, response) => {
    // console.log(request.params.id, request.session.userId);
    if (request.params.id != request.session.userId) {
        db.getUser(request.params.id)
            .then(({ rows }) => {
                console.log("Rows in the user are", rows);
                response.json(rows);
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        console.log("here i am in the else");
        response.json({
            user: true
        });
    }
});
app.get("/friendships", (request, response) => {
    db.getFriends(request.session.userId).then(({ rows }) => {
        response.json(rows);
        console.log("These are the friendships", rows.length);
    });
});
app.get("/friendship/status/:id", (request, response) => {
    console.log(
        "the id i'm making the request with is ",
        request.params.id,
        request.session.userId
    );
    db.friendshipStatus(request.session.userId, request.params.id)
        .then(({ rows }) => {
            response.json(rows[0]);
            console.log("This is what i get when i check it", rows);
        })
        .catch(err => console.log("Can't get the friendship status", err));
});
app.post("/friendship/send/:id", (request, response) => {
    console.log(
        "Friendship request sent",
        request.session.userId,
        request.params.id
    );
    db.sendFriendshipRequest(request.session.userId, request.params.id).then(
        ({ rows }) => {
            response.json(rows);
        }
    );
});
app.post("/friendship/delete/:id", (request, response) => {
    console.log(
        "Friendship request DELETED",
        request.session.userId,
        request.params.id
    );
    db.deleteFriendshipRequest(request.session.userId, request.params.id).then(
        ({ rows }) => {
            response.json(rows);
        }
    );
});
app.post("/friendship/accept/:id", (request, response) => {
    console.log(
        "Friendship request ACCEPTED",
        request.session.userId,
        request.params.id
    );
    db.acceptFriendshipRequest(request.session.userId, request.params.id).then(
        ({ rows }) => {
            response.json(rows);
        }
    );
});

app.get("*", (request, response) => {
    if (!request.session.userId && request.url != "/welcome") {
        response.redirect("/welcome");
    } else {
        response.sendFile(__dirname + "/index.html");
    }
});

server.listen(process.env.PORT || 8080, () => {
    ca.rainbow("I'm listening.");
});

let onlineUser = {};
io.on("connection", socket => {
    const userId = socket.request.session.userId;
    db.getUsersByIds(Object.values(onlineUser)).then(({ rows }) => {
        console.log("Here the online users", rows);
        socket.emit("onlineUsers", rows);
    });
    onlineUser[socket.id] = userId;
    let logs = Object.values(onlineUser).filter(id => id == userId).length;
    if (logs == 1) {
        db.getNewUser(userId).then(({ rows }) => {
            console.log("Here the New user", rows);
            socket.broadcast.emit("userJoined", rows);
        });
    }
    console.log(`Socket with the id ${socket.id} is now connected`);
    if (!socket.request.session || !socket.request.session.userId) {
        return socket.broadcast.disconnect(true);
    }

    ///////////////CHAT
    db.getUsersAndChats().then(({ rows }) => {
        console.log("Getting the chat and the users", rows);
        socket.emit("chatMessages", rows);
    });

    socket.on("newChatMessage", data => {
        console.log("emitting the insert event", data, userId);
        db.newChatMessage(userId, data).then(({ rows }) => {
            console.log("Targeting rows", rows);
            var data = rows[0].message;
            var time = rows[0].created_at;
            var chatId = rows[0].id;
            db.getNewUser(userId).then(({ rows }) => {
                let myNewChatObj = {
                    userId: userId,
                    first_name: rows[0].first_name,
                    image_url: rows[0].image_url,
                    message: data,
                    id: chatId,
                    created_at: time
                };
                console.log("Before emitting it to redux", myNewChatObj);
                io.sockets.emit("chatMessageForRedux", myNewChatObj);
            });
        });
        // this message is sent to socket.js
    });

    /////DISCONNECTION
    socket.on("disconnect", () => {
        console.log(
            "This is the record relative to socket ",
            onlineUser[socket.id]
        );
        io.emit("userLeft", onlineUser[socket.id]);
        delete onlineUser[socket.id];
        ca.neon(`Socket with the id ${socket.id} is now disconnected`);
        console.log("After disconnecting the remaining users are ", onlineUser);
    });
});
