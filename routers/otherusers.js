const { app } = require("../index");

const db = require("../db");

const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/user/:id", (req, res) => {
    if (req.params.id == req.session.userId) {
        return res.json({ redirect: true });
    }
    db.getOtherDetails(req.params.id).then(({ rows }) => {
        res.json(rows[0]);
    });
});

app.get("/friend/status/:id", (req, res) => {
    db.getFriendship(req.session.userId, req.params.id)
        .then(({ rows }) => {
            let option;
            if (!rows[0]) {
                option = "befriend";
            } else if (rows[0].requester == req.session.userId) {
                if (rows[0].status) {
                    option = "unfriend";
                } else {
                    option = "cancel";
                }
            } else if (rows[0].receiver == req.session.userId) {
                if (rows[0].status) {
                    option = "unfriend";
                } else {
                    option = "accept";
                }
            }
            res.json(option);
        })
        .catch(err => {
            res.json({ error: true });
            console.log(err);
        });
});

app.post("/friendship/:option/:id", (req, res) => {
    const option = req.params.option;

    if (option == "befriend") {
        db.friendRequest(req.session.userId, req.params.id)
            .then(() => {
                res.json("cancel");
            })
            .catch(err => {
                res.json({ error: err });
            });
    } else if (option == "accept") {
        db.friendAccept(req.session.userId, req.params.id)
            .then(() => {
                res.json("unfriend");
            })
            .catch(err => {
                res.json({ error: err });
            });
    } else if (option == "cancel" || option == "unfriend") {
        db.unfriend(req.session.userId, req.params.id)
            .then(() => {
                res.json("befriend");
            })
            .catch(err => {
                res.json({ error: err });
            });
    } else {
        res.json({ error: true });
    }
});
