const { app } = require("../index");

const db = require("../db");
const bc = require("../bc");

const cookieSession = require("cookie-session");
const csurf = require("csurf");

app.use(
    cookieSession({
        secret: "bananorama",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/register", (req, res) => {
    console.log("body goes here: ", req.body);
    db.checkEmail(req.body.email)
        .then(useCount => {
            if (useCount.rows[0].count > 0) {
                throw new Error("This email is already being used!");
            } else {
                if (
                    req.body.firstName &&
                    req.body.lastName &&
                    req.body.email &&
                    req.body.password
                ) {
                    return bc
                        .hashPassword(req.body.password)
                        .then(hashedPassword => {
                            return db
                                .addUser(
                                    req.body.firstName,
                                    req.body.lastName,
                                    req.body.email,
                                    hashedPassword
                                )
                                .then(({ rows }) => {
                                    req.session.userId = rows[0].id;
                                    res.json({ error: false });
                                });
                        });
                } else {
                    throw new Error("You forgot to fill out some fields!");
                }
            }
        })
        .catch(err => {
            console.log("error from register route: ", err);
            res.json({ error: err.message });
        });
});

app.post("/login", (req, res) => {
    db.checkEmail(req.body.email)
        .then(useCount => {
            if (useCount.rows[0].count == 0) {
                throw new Error("We don't know this email.");
            } else {
                return db.getPass(req.body.email).then(({ rows }) => {
                    const cryptedPass = rows[0].password;
                    const id = rows[0].id;
                    return bc
                        .checkPassword(req.body.password, cryptedPass)
                        .then(doesMatch => {
                            if (doesMatch) {
                                req.session.userId = id;
                                res.json({ error: false });
                            } else {
                                throw new Error(
                                    "Password does not match, sorry."
                                );
                            }
                        });
                });
            }
        })
        .catch(err => {
            console.log("error from register route: ", err);
            res.json({ error: err.message });
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});
