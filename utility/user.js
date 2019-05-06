(function() {
    "use strict";

    const { app } = require("../index");
    const db = require("./db");

    app.get("/user", (req, res) => {
        db.getUserInformation(req.session.userId)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch(() => {
                res.sendStatus(404);
            });
    });

    app.get("/api/user/:id", (req, res) => {
        if (req.session.userId == req.params.id) {
            return res.status(400).json({ error: "Access denied." });
        }
        db.getUserInformation(req.params.id)
            .then(data => {
                data.rows[0]
                    ? res.json(data.rows[0])
                    : res.json({ redirect: true });
            })
            .catch(() => {
                res.sendStatus(404);
            });
    });
})();
