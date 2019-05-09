const express = require("express");
const app = (exports.app = express());
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080"
});

const cookieSession = require("cookie-session");
const cookieSessionMiddleware = (exports.cookieSessionMiddleware = cookieSession(
    {
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 90
    }
));

// const moment = require("moment");

const compression = require("compression");
app.use(compression());

// const db = require("./db");

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => {
        res.sendFile(`${__dirname}/bundle.js`);
    });
}

require("./routers/validation");
require("./routers/profile");
require("./routers/otherusers");

app.use(express.static("./public"));

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

const db = require("./db");

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

let onlineUsers = {};
io.on("connection", socket => {
    console.log(`socket with the id ${socket.id} is now connected`);

    const userId = socket.request.session.userId;

    let otherOnlineUsers = Object.keys(onlineUsers).filter(id => {
        if (id != userId) {
            return id;
        }
    });

    db.getUsersByIds(otherOnlineUsers)
        .then(({ rows }) => {
            console.log("rows", rows);
            socket.emit("onlineUsers", rows);
        })
        .catch(err => {
            console.log(err);
        });

    let thisUserData;
    db.getUserData(userId)
        .then(({ rows }) => {
            thisUserData = rows[0];
        })
        .catch(err => {
            console.log(err);
        });

    if (onlineUsers[userId]) {
        onlineUsers[userId].push(socket.id);
    } else {
        onlineUsers[userId] = [socket.id];
        socket.broadcast.emit("userJoined", thisUserData);
    }

    socket.on("receiveChat", () => {
        db.getChat()
            .then(({ rows }) => {
                const answer = rows.reverse().map(message => {
                    const datePost = new Date(message.posted);
                    return { ...message, posted: datePost.toGMTString() };
                });

                socket.emit("gotChat", answer);
            })
            .catch(err => {
                console.log(err);
            });
    });

    socket.on("newChatMessage", async chatMessage => {
        db.addChat(userId, chatMessage)
            .then(({ rows }) => {
                const datePost = new Date(rows[0].posted);
                let newChatMessage = {
                    chatid: rows[0].id,
                    userId: thisUserData.id,
                    first_name: thisUserData.first_name,
                    last_name: thisUserData.last_name,
                    message: chatMessage,
                    posted: datePost.toGMTString()
                };
                io.emit("gotNewChatMessage", newChatMessage);
            })
            .catch(err => {
                console.log(err);
            });
    });

    socket.on("disconnect", () => {
        onlineUsers[userId] = onlineUsers[userId].filter(socketId => {
            if (socketId != socket.id) {
                return socketId;
            }
        });

        if (onlineUsers[userId].length == 0) {
            delete onlineUsers[userId];
            socket.broadcast.emit("userLeft", userId);
        }
        console.log("onlineUsers after delete: ", onlineUsers);
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });
});

server.listen(8080, () => {
    console.log("I'm listening.");
});
