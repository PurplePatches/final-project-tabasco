(function() {
    "use strict";

    const { app } = require("../index");
    const db = require("./db");

    app.get("/user", (req, res) => {
        db.getUserInformation(req.session.userId)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch(e => {
                console.log("GET /user getUserInformation: ", e);
            });
    });

    app.get("/user/:id", (req, res) => {
        db.getUserInformation(req.session.userId)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch(e => {
                console.log("GET /user getUserInformation: ", e);
            });
    });
})();
