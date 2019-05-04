(function() {
    "use strict";

    const { app } = require("../index");
    const db = require("./db");

    app.post("/edit", (req, res) => {
        db.updateBio(req.session.userId, req.body.bio).then(data => {
            res.json(data);
        });
    });
})();
