const express = require("express");
const app = express();

const db = require("./db");
const bc = require("./bc");

const cookieSession = require("cookie-session");

app.use(
    cookieSession({
        secret: "bananorama",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })
);

app.use(require("body-parser").urlencoded({ extended: false }));

app.post("/register", (req, res) => {
    db.addUser(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password
    )
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});
