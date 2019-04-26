(function() {
    "use strict";

    const express = require("express");
    const app = (exports.app = express());
    const compression = require("compression");
    const cookieSession = require("cookie-session");
    const bodyParser = require("body-parser");
    const csurf = require("csurf");

    ////////////////////
    // COMPRESS DATA //
    //////////////////

    app.use(compression());

    ///////////////////
    // CREATE PROXY //
    /////////////////

    if (process.env.NODE_ENV != "production") {
        app.use(
            "/bundle.js",
            require("http-proxy-middleware")({
                target: "http://localhost:8081/"
            })
        );
    } else {
        app.use("/bundle.js", (req, res) =>
            res.sendFile(`${__dirname}/bundle.js`)
        );
    }

    //////////////
    // COOKIES //
    ////////////

    app.use(
        cookieSession({
            maxAge: 1000 * 60 * 60 * 24 * 14,
            secret: `It's a secret!`
        })
    );

    //////////////////
    // BODY PARSER //
    ////////////////

    app.use(
        bodyParser.urlencoded({
            extended: false
        })
    );
    app.use(bodyParser.json());

    ////////////
    // CSURF //
    //////////

    app.use(csurf());

    app.use(function(req, res, next) {
        res.cookie("mytoken", req.csrfToken());
        next();
    });

    ///////////////////////////
    // ACCESS PUBLIC FOLDER //
    /////////////////////////

    app.use(express.static("./public"));

    //////////////
    // ROUTING //
    ////////////

    require("./utility/auth");
    require("./utility/welcome");

    app.get("*", (req, res) => {
        if (!req.session.userId) {
            res.redirect("/welcome");
        } else {
            res.sendFile(__dirname + "/index.html");
        }
    });

    app.listen(8080, function() {
        console.log("S E R V E R  I S  O N L I N E");
    });
})();
