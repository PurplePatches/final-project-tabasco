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
