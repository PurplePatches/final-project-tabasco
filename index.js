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
app.use(
    bodyParser.urlencoded({
        extended: false
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
app.get("/", (req, res) => {
    res.render("/logo");
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/registration", (req, res) => {
    bc.hashPassword(req.body.password).then(hash => {
        return db
            .register(
                req.body.first_name,
                req.body.last_name,
                req.body.email,
                hash
            )
            .then(data => {
                req.session.first_name = data.rows[0].first_name;
                req.session.last_name = data.rows[0].last_name;
                req.session.userID = data.rows[0].id;
                res.json(true);
            })
            .catch(err => {
                res.json(false);
            })
            .console.log(err);
    });
});

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
