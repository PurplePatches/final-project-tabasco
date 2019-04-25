(function() {
    "use strict";

    const { app } = require("../index");

    app.get("/welcome", (req, res) => {
        // if (req.session.userId) {
        //     res.redirect("/");
        // } else {
        //     res.sendFile(__dirname + "/index.html");
        // }
    });
})();
