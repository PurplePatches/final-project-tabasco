const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const db = require("./db.js");
const bc = require("./bc.js");
const body = require("body-parser");
var multer = require("multer");
var uidSafe = require("uid-safe");
const config = require("./config");
const s3 = require("./s3");
//SOCKETIO:
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" }); // your app heroku otherwise

//REDUX

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads"); //file should be stored locally in uploads folder
    },
    filename: function(req, file, callback) {
        //this will give the name to the file
        uidSafe(24).then(function(uid) {
            //uidSafe will generate a name, 24 char long, to avoid same file name
            callback(null, uid + path.extname(file.originalname)); //figures out the extension of the file
        });
    }
});

var uploader = multer({
    //that's middleware to actually upload the file, we need configuration :
    storage: diskStorage, //refers to diskStorage declared above ^^
    limits: {
        fileSize: 2097152
    }
});
app.use(compression());

const cookieSessionMiddleware = cookieSession({
    secret: `blah`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
//taking all data from cookies and send it to socket so we can use it
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
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
    body.urlencoded({
        extended: false
    })
);
app.use(body.json());

app.use(express.static("./public"));

//NEW WAY!!! ASYNC!!!
app.post("/register", async (req, res) => {
    try {
        const hash = await bc.hashPassword(req.body.password);
        const register = await db.register(
            req.body.first,
            req.body.last,
            req.body.email,
            hash,
            null,
            null
        );
        req.session.userId = register.rows[0].id;
        res.json({ sucess: true });
    } catch (err) {
        console.log("error in register route", err);
    }
});
// app.post("/login", async (req, res) => {
//     const pw = await db.retrievePassword(req.body.email);
//     const pwcheck = await bc.checkPassword(req.body.password, pw.rows[0].id);
//     if (pwcheck) {
//         req.session.userId = pw.rows[0].id;
//         res.json(pw.rows[0].id);
//     } else {
//         res.json({ error: true });
//         console.log("ERROR HERE!!!");
//     }
// });
app.post("/login", (req, res) => {
    db.retrievePassword(req.body.email)
        .then(hash => {
            let id = hash.rows[0].id;
            bc.checkPassword(req.body.password, hash.rows[0].password)
                .then(results => {
                    if (results) {
                        req.session.userId = id;
                        //CAREFUL! Results would put "true" as cookie userid... changed for id.
                        res.json(id);
                    } else {
                        res.json({ error: true });
                        console.log("ERROR HERE!!!");
                    }
                })
                .catch(err => {
                    res.json({ error: true });
                    console.log(err);
                });
        })
        .catch(err => {
            res.json({ error: true });
            console.log(err);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("/delete", (req, res) => {
    db.deleteUser(req.session.userId).then(whatever => {
        db.deleteFriendships(req.session.userId).then(whatever => {
            req.session = null;
            res.redirect("/welcome");
        });
    });
});

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
//IMAGEUPLOAD
app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    const url = config.s3Url + req.file.filename;

    db.uploadPicture(req.session.userId, url).then(whatever => {
        console.log(whatever, "WHATEVER!!");
        res.json(whatever.rows[0]);
    });
    // db.newImage(url, )
    // JSON response should be an arroay of object with the above properties
});
app.get("/user", (req, res) => {
    if (req.session.userId) {
        db.retrieveUser(req.session.userId).then(({ rows }) => {
            console.log(rows, "CHECKING /USER route");
            res.json(rows[0]);
        });
    }
});

app.get("/user/:id/nope", function(req, res) {
    if (req.params.id == req.session.userId) {
        res.json({
            redirect: true
        });
    } else {
        db.retrieveUser(req.params.id)
            .then(({ rows }) => {
                console.log(rows, "CHECKING /user/ID route");
                console.log(rows[0].id, "ROWS ID");
                res.json(rows[0]);
            })

            .catch(() => {
                res.json({
                    redirect: true
                });
            });
    }
}); //.json because must be named differently

app.post("/bioedit", (req, res) => {
    db.updateBio(req.session.userId, req.body.bio).then(({ rows }) => {
        res.json(rows[0]);
    });
});

//FRIENDSHIP//

//ORIGINAL REQUEST TO CHECK FRIENDS STATUS
app.post("/getprofile", (req, res) => {
    console.log(req.body.otherId, "OTHER ID");
    db.checkFriend(req.session.userId, req.body.otherId).then(({ rows }) => {
        console.log("ROWS!", rows[0]);
        if (rows[0] == undefined) {
            console.log("nothing here, no friends");
            res.json({
                unknown: true
            });
        } else if (
            !rows[0].accepted &&
            rows[0].sender_id == req.session.userId
        ) {
            console.log(rows[0].sender_id, "SENDER ID!");
            console.log("REQUEST SENT BY ME! not accepted yet");

            res.json({
                friendship: false,
                requestOwner: true,
                unknown: false
            });
        } else if (rows[0].accepted == true) {
            res.json({
                friendship: true
            });
        }
    });
});

//ASK FOR FRIENDSHIP

app.post("/ask", (req, res) => {
    db.askFriend(req.session.userId, req.body.otherId, false).then(
        ({ rows }) => {
            console.log("RESULT AFTER ASKING FRIEND", rows[0]);
            res.json(rows[0]);
        }
    );
});
//REFUSE.CANCEL REQUEST / DELETE FRIEND
app.post("/delete", (req, res) => {
    db.deleteFriend(req.session.userId, req.body.otherId).then(() => {
        db.checkFriend(req.session.userId, req.body.otherId).then(
            ({ rows }) => {
                console.log("ROWS!", rows[0]);
                if (rows[0] == undefined) {
                    console.log("nothing here, no friends");
                    res.json({
                        unknown: true
                    });
                } else if (
                    !rows[0].accepted &&
                    rows[0].sender_id == req.session.userId
                ) {
                    console.log(rows[0].sender_id, "SENDER ID!");
                    console.log("REQUEST SENT BY ME! not accepted yet");

                    res.json({
                        friendship: false,
                        requestOwner: true,
                        unknown: false
                    });
                } else if (rows[0].accepted == true) {
                    res.json({
                        friendship: true
                    });
                }
            }
        );
    });
});

//ACCEPT FRIEND REQUEST
app.post("/accept", (req, res) => {
    console.log(req.body.otherId, "accept other id");
    db.acceptFriend(req.session.userId, req.body.otherId, true).then(
        ({ rows }) => {
            res.json(rows[0]);
        }
    );
});

//FRIENDS LIST
app.get("/friends/a", (req, res) => {
    db.retrieveFriends(req.session.userId).then(({ rows }) => {
        console.log(rows, "ROWS FRIENDS!");
        res.json(rows);
    });
});

app.post("/unfriend", (req, res) => {
    db.deleteFriend(req.session.userId, req.body.otherId).then(() => {
        res.json({ success: true });
    });
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//SERVER listen

server.listen(8080, function() {
    console.log("I'm listening.");
});

//SOCKET IO STUFF PART 8 :
let onlineUsers = {};

io.on("connection", function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    if (!socket.request.session.userId || !socket.request.session) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;

    onlineUsers[socket.id] = userId;

    console.log("onlineUsers after new connection:", onlineUsers);

    console.log("obj values:", Object.values(onlineUsers));

    db.getUsersByIds(Object.values(onlineUsers)).then(({ rows }) => {
        console.log(rows, "rows of getUsersByIds");
        socket.emit("onlineUsers", rows);
    });

    if (Object.values(onlineUsers).filter(arg => arg == userId).length === 1) {
        console.log("userJOINED once!", socket.request.session.userId);
        db.retrieveUser(socket.request.session.userId).then(({ rows }) => {
            socket.broadcast.emit("userJoined", rows[0]);
        });
    }

    socket.on("disconnect", function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);
        console.log(onlineUsers, "online users after disconnect");

        delete onlineUsers[socket.id];
        io.emit("userLeft", socket.request.session.userId);
    });

    //how to delete : delete onlineUsers[socket.id]
    socket.on("getMessages", () => {
        db.retrieveChat().then(({ rows }) => {
            db.retrieveChatAuthors().then(({ rows }) => {
                console.log("rows in get messages", rows);
                io.emit("getMessages", rows);
            });
        });
    });
    //.values gives the value of the key / value pair
    socket.on("newChatMessage", data => {
        //QUERY DB TO GET INFO ABOUT USER WHO POSTED THE INFO
        db.insertMessage(data, socket.request.session.userId).then(() => {
            db.retrieveUser(userId).then(({ rows }) => {
                console.log(data, "info back from socket.on");
                console.log(rows[0].id);
                //make an object which is the same as one that redux excpects :
                let myNewChatObj = {
                    first: rows[0].first,
                    last: rows[0].last,
                    url: rows[0].url,
                    message: data
                    //etc...
                };
                db.retrieveChat().then(({ rows }) => {
                    db.retrieveChatAuthors().then(({ rows }) => {
                        console.log("rows in get messages", rows);
                        io.emit("getMessages", rows);
                    });
                });

                console.log(myNewChatObj, "myNewChat");

                io.emit("newChatMessage", myNewChatObj);
            });
        });
    });

    socket.broadcast.emit("yooo only you!");
    io.sockets.emit("newConnector", "another");
    // console.log(io.sockets.sockets, "SOCKETS SOCKETS");
});
