(function() {
    "use strict";

    const { app } = require("../index");
    const db = require("./db");
    const bcrypt = require("../src/bcrypt.js");
    // const {
    //     requireLoggedOutUser,
    //     requireNoSignature
    // } = require("./middleware");

    // app.get(
    //     "/register",
    //     requireLoggedOutUser,
    //     requireNoSignature,
    //     (req, res) => {
    //         res.render("register", {
    //             title: "Register",
    //             layout: "main"
    //         });
    //     }
    // );

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
                        let id = data.rows[0].id;
                        req.session.userId = id;
                        // res.redirect("/profile");
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

    // app.get("/login", requireLoggedOutUser, requireNoSignature, (req, res) => {
    //     res.render("login", {
    //         title: "Login",
    //         layout: "main"
    //     });
    // });

    // app.post("/login", (req, res) => {
    //     db.getHashedPassword(req.body.emailAddress)
    //         .then(data => {
    //             let id = data.rows[0].id;
    //             bcrypt
    //                 .checkPassword(req.body.password, data.rows[0].password)
    //                 .then(doesMatch => {
    //                     if (doesMatch) {
    //                         req.session.userId = id;
    //                         db.checkIfSigned(req.session.userId).then(data => {
    //                             if (data.rows.length > 0) {
    //                                 req.session.signatureId = data.rows[0].id;
    //                                 res.redirect("/credits");
    //                             } else {
    //                                 res.redirect("/petition");
    //                             }
    //                         });
    //                     } else {
    //                         res.render("login", {
    //                             title: "Login",
    //                             error: "error",
    //                             layout: "main"
    //                         });
    //                     }
    //                 })
    //                 .catch(err => {
    //                     console.log("POST /login checkPassword() error: ", err);
    //                 });
    //         })
    //         .catch(err => {
    //             console.log("POST /login getHashedPassword() error: ", err);
    //         });
    // });

    // app.post("/logout", (req, res) => {
    //     req.session = null;
    //     res.redirect("/login");
    // });
})();
