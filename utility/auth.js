(function() {
    "use strict";

    const { app } = require("../index");
    const db = require("./db");
    const bcrypt = require("../src/bcrypt.js");

    /////////////////////
    // REGISTER ROUTE //
    ///////////////////

    app.post("/register", (req, res) => {
        bcrypt
            .hashPassword(req.body.password)
            .then(hash => {
                db.registerInfo(
                    req.body.first,
                    req.body.last,
                    req.body.email,
                    hash
                )
                    .then(data => {
                        if (data.rows.length == 1) {
                            let id = data.rows[0].id;
                            req.session.userId = id;
                            res.json({ success: true });
                        } else {
                            res.json({ success: false });
                        }
                    })
                    .catch(err => {
                        console.log(
                            "POST /register registerInfo() error: ",
                            err
                        );
                    });
            })
            .catch(err => {
                console.log("POST /register hashPassword() error: ", err);
            });
    });

    // app.post("/register", async (req, res) => {
    //     try {
    //         const { first, last, email, password } = req.body;
    //         const hash = await bcrypt.hashPassword(req.body.password);
    //         const data = await db.registerInfo(
    //             req.body.first,
    //             req.body.last,
    //             req.body.email,
    //             hash
    //         );
    //         req.session.userId = data.rows[0].id;
    //         res.json({ success: true });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });

    ///////////////////
    // LOG IN ROUTE //
    /////////////////

    app.post("/login", (req, res) => {
        db.getHashedPassword(req.body.email)
            .then(data => {
                let id = data.rows[0].id;
                bcrypt
                    .checkPassword(req.body.password, data.rows[0].password)
                    .then(doesMatch => {
                        if (doesMatch) {
                            req.session.userId = id;
                            res.json({ success: true });
                        } else {
                            res.json({ success: false });
                        }
                    })
                    .catch(err => {
                        console.log("POST /login checkPassword() error: ", err);
                    });
            })
            .catch(err => {
                console.log("POST /login getHashedPassword() error: ", err);
            });
    });

    ////////////////////
    // LOG OUT ROUTE //
    //////////////////

    app.get("/logout", (req, res) => {
        req.session = null;
        res.redirect("/");
    });
})();
