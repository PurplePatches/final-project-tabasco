const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const bcrypt = require("./utiles/bcrypt");
const db = require("./utiles/db");
const body = require("body-parser");
const csurf = require("csurf");

app.use(compression());

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
    cookieSession({
        secret: `french`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(body.urlencoded({ extended: false }));
app.use(body.json());

app.use(express.static("./public"));
/////////FIRST PART//////////////////////////
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    bcrypt
        .hashPassword(req.body.password)
        .then(hashedPassword => {
            db.createUser(
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hashedPassword
            ).then(id => {
                req.session.userId = id.rows[0].id;
                res.json(id.rows[0]);
            });
        })
        .catch(err => {
            res.json({ error: true });
        });
});

app.post("/login", (req, res) => {
    db.logIn(req.body.email)
        .then(data => {
            bcrypt
                .checkPassword(req.body.password, data.rows[0].password)
                .then(match => {
                    if (!match) {
                        res.json({ wrongPassword: true });
                    } else {
                        req.session.userId = data.rows[0].id;
                        res.json(data);
                    }
                });
        })
        .catch(err => {
            res.json({ wrongEmail: true });
        });
});

/////////LAST PART///////////////////////////
app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
