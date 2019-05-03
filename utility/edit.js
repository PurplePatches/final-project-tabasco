(function() {
    "use strict";

    const { app } = require("../index");
    const db = require("./db");

    app.post("/edit", (req, res) => {
        console.log("TEST", req.body.bio);
        db.updateBio(req.session.userId, req.body.bio).then(data => {
            res.json(data);
        });
    });
})();
