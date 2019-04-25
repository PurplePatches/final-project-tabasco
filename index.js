const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const chalkAnimation = require("chalk-animation");
const bodyParser = require("body-parser");
const bcrypt = require("./bcrypt.js");

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

app.use(require("body-parser").json());

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
        });

    // db.addUsers(firstname, lastname, email, password)
    //     .then(results => {
    //         console.log("results in addUsers", results);
    //     })
    //     .catch(err => {
    //         console.log("error in addUsers", err);
    //     });
    // res.json()  ----  all routs will send json
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
