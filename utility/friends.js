(function() {
    "use strict";

    const { app } = require("../index");
    const db = require("./db");
    const { userIsLoggedIn } = require("./auth");

    app.get("/api/friends", userIsLoggedIn, (req, res) => {
        db.getFriends(req.session.userId)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch(() => {
                res.sendStatus(404);
            });
    });

    app.post("/api/friend/:recipient/send", userIsLoggedIn, (req, res) => {
        db.sendFriendRequest(req.session.userId, req.params.recipient).then(
            () => res.sendStatus(200)
        );
    });
})();
