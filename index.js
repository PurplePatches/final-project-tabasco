const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const passwords = require("./passwords");
const bodyParser = require("body-parser");
const db = require("./db");

app.use(compression());

app.use(
    cookieSession({
        secret: "10 reason why you should quit social media.",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6
    })
);

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

app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(express.static("./public"));

app.post("/register", (req, res) => {
    console.log(req.body);
    const { firstname, lastname, email, password } = req.body;
    console.log(firstname);

    passwords
        .hashPassword(password)
        .then(hash => {
            return db
                .addUser(firstname, lastname, email, hash)
                .then(results => {
                    req.session.userId = results.rows[0].id;
                    res.json({ scuccess: true });
                })
                .catch(err => {
                    console.log("error in register ", err);
                    res.json({ success: false });
                });
        })
        .catch(err => {
            console.log("hash", err);
            res.json({ success: false });
        });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    let userID;
    console.log(email);
    db.loadUser(email)
        .then(results => {
            if (results.rows.length == 0) {
                console.log("The login data is not matching any existing user");
                res.json({ success: false });
            }
            req.session.userId = results.rows[0].id;
            return passwords.compare(password, results.rows[0].password);
        })
        .then(result => {
            if (result) {
                req.session.userId = results.rows[0].id;
                res.json({ scuccess: true });
            } else {
                console.log("NO NO NO WRONG WRONG WRONG PSSWD");
                res.json({ success: false });
            }
        })
        .catch(err => {
            console.log("error", err);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening on 8080.");
});
