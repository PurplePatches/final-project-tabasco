const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const bc = require("./utils/bcrypt");

app.use(compression());
app.use(express.static("./public"));

app.use(
    cookieSession({
        secret: "It's social network time!",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 14
    })
);
app.use(bodyParser.json());
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/registration", (req, res) => {
    bc.hashPassword(req.body.password).then(hash => {
        console.log("show me req.body: ", req.body);
        return db
            .register(
                // req.body.id,
                req.body.first_name,
                req.body.last_name,
                req.body.email,
                hash
            )
            .then(data => {
                req.session.userId = data.rows[0].id;
                res.json({
                    success: true
                });
                console.log(
                    "show me req.session.userId in POST/registration",
                    req.session.userId
                );
            })
            .catch(err => {
                res.json({ success: false });
                console.log("Please try again", err);
            });
    });
});

app.post("/login", (req, res) => {
    db.login(req.body.email).then(user => {
        if (user.rows.length === 1) {
            bc.checkPassword(req.body.password, user.rows[0].password)
                .then(isAuthorized => {
                    req.session.userId = user.rows[0].id;
                    if (isAuthorized == true) {
                        console.log("Success!");
                        res.json({
                            success: true
                        });
                    } else {
                        console.log("Fail else!!!, invalid password");
                        res.json({
                            err: true
                        });
                    }
                })
                .catch(err => {
                    req.session.userId = null;
                    console.log("Fail catch!!!");
                    res.json({
                        err: true
                    });
                    console.log("err, reason", err);
                });
        } else {
            console.log("Fail else!!!, invalid email");
            res.json({
                err: "Invalid email"
            });
        }
    });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(process.env.PORT || 8080, () => console.log("I'm listening"));
