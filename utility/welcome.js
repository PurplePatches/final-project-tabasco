(function() {
    "use strict";

    const { app } = require("../index");
    const path = require("path");

    app.get("/welcome", (req, res) => {
        if (req.session.userId) {
            res.redirect("/");
        } else {
            res.sendFile(path.join(__dirname, "../index.html"));
        }
    });
})();
