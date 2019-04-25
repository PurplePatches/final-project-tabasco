const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const chalkAnimation = require("chalk-animation");
const bodyParser = require("body-parser");
const bcrypt = require("./bcrypt.js");
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

app.use(express.static("./public"));

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24 * 14,
        secret: `I'm always hungry.`
    })
);
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.post("/register", (req, res) => {
    console.log("post register");
    let firstname = req.body.firstname;
    console.log("firstname", firstname);
    let lastname = req.body.lastname;
    console.log("lastname", lastname);
    let email = req.body.email;
    console.log("email", email);
    let password = req.body.password;
    console.log("Password", password);

    bcrypt
        .hashPassword(password)
        .then(password => {
            db.addUsers(firstname, lastname, email, password)
                .then(password => {
                    // req.session.userId = password.rows[0].id;
                    res.redirect("/");
                })
                .catch(err => {
                    console.log("error in Post Register...", err);
                });
        })
        .catch(err => {
            console.log("error in hash password", err);
            res.send({ message: "error" });
        });
});

//---------------- LOGIN -----------------------//

app.post("/login", async (req, res) => {
    let email = req.body.email;
    console.log("EMAIL in Login", email);
    let newpassword = req.body.newpassword;
    console.log("newpassword in Login", newpassword);

    let password = await db
        .getPassword(email)
        .then(result => {
            return result.rows[0].password;
        })
        .catch(err => {
            console.log("error in password", err);
        });

    let checkPassword = await bcrypt
        .checkPassword(newpassword, password)
        .then(result => {
            if (result == true) {
                res.redirect("/");
            } else {
                console.log("error in password");
            }
        })
        .catch(err => {
            console.log("error on check password", err);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("/welcome", (req, res) => {
    // if (req.session.userId) {
    //     res.redirect("/");
    // } else {
    res.sendFile(__dirname + "/index.html");
    // }
});

app.get("*", (req, res) => {
    // if (!req.session.userId && req.url != "/welcome") {
    //     res.redirect("/welcome");
    // } else {
    res.sendFile(__dirname + "/index.html");
    // }
});

app.listen(8080, function() {
    chalkAnimation.neon("L I S T E N I N G . . .");
});
