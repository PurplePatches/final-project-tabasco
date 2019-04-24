const { app } = require("../index");

const db = require("../db");
const bc = require("../bc");

const cookieSession = require("cookie-session");

app.use(
    cookieSession({
        secret: "bananorama",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })
);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/register", (req, res) => {
    console.log("body goes here: ", req.body);
    db.checkEmail(req.body.email).then(useCount => {
        if (useCount.rows[0].count > 0) {
            throw new Error("This email is already being used!");
        } else {
            bc.hashPassword(req.body.password)
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
                })
                .catch(err => {
                    console.log("error from register route: ", err);
                    // res.status(500);
                    res.json({ error: true });
                });
        }
    });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});
