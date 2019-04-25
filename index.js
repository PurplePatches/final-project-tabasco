const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const db = require("./db.js");
const bc = require("./bc.js");
const body = require("body-parser");
app.use(compression());

app.use(
    cookieSession({
        secret: "blah",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6
    })
);
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

app.use(
    body.urlencoded({
        extended: false
    })
);
app.use(body.json());

app.use(express.static("./public"));

app.post("/register", (req, res) => {
    bc.hashPassword(req.body.password)
        .then(hash => {
            db.register(
                req.body.first,
                req.body.last,
                req.body.email,
                hash
            ).then(id => {
                req.session.userId = id.rows[0].id;
                res.json(id);
            });
        })
        .catch(err => {
            res.json({ error: true });
            console.log(err);
        });
});

app.post("/login", (req, res) => {
    db.retrievePassword(req.body.email)
        .then(hash => {
            let id = hash.rows[0].id;
            bc.checkPassword(req.body.password, hash.rows[0].password)
                .then(results => {
                    if (results) {
                        req.session.userId = id;
                        //CAREFUL! Results would put "true" as cookie userid... changed for id.
                        res.json(id);
                    } else {
                        res.json({ error: true });
                        console.log("ERROR HERE!!!");
                    }
                })
                .catch(err => {
                    res.json({ error: true });
                    console.log(err);
                });
        })
        .catch(err => {
            res.json({ error: true });
            console.log(err);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
