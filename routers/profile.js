const { app } = require("../index");

const db = require("../db");

app.get("/user", (req, res) => {
    db.getUserData(req.session.userId).then(({ rows }) => {
        res.json(rows[0]);
    });
});
