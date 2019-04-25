const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const db = require("./utils/db");
const bc = require("./utils/bc");
const compression = require("compression");

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (request, response) =>
        response.sendFile(`${__dirname}/bundle.js`)
    );
}
app.use(express.static(__dirname + "/public"));

app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24 * 14,
        secret: process.env.SESSION_SECRET || "I am always angry."
    })
);
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(csurf());
app.use((request, response, next) => {
    response.cookie("mytoken", request.csrfToken());
    next();
});

app.get("/logout", (request, response) => {
    request.session = null;
    response.redirect("/welcome");
});
app.get("/welcome", (request, response) => {
    if (request.session.userId) {
        response.redirect("/");
    } else {
        response.sendFile(__dirname + "/index.html");
    }
});
app.post("/register", (request, response) => {
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let email = request.body.email;
    console.log("before hashing the password", request.body);
    bc.hashPassword(request.body.password)
        .then(pwd => {
            request.session.firstName = firstName;
            request.session.lastName = lastName;
            console.log("Checking the First name in Registration", firstName);
            return db.newUser(firstName, lastName, email, pwd).then(data => {
                request.session.userId = data.rows[0].id;
                response.json(data.rows);
            });
        })
        .catch(err => {
            console.log("Error in post register", err);
            response.json({ error: err.message });
        });
});
app.get("/bio", (request, response) => {
    if (request.session.userId) {
        response.redirect("/");
    } else {
        response.sendFile(__dirname + "/index.html");
    }
});
app.get("/login", (request, response) => {
    if (request.session.userId) {
        response.redirect("/");
    } else {
        response.sendFile(__dirname + "/index.html");
    }
});
app.post("/login", (request, response) => {
    db.userPassword(request.body.email)
        .then(user => {
            bc.checkPassword(request.body.password, user.rows[0].password).then(
                data => {
                    if (data) {
                        request.session.userId = user.rows[0].id;
                        request.session.firstName = user.rows[0].first_name;
                        request.session.lastName = user.rows[0].last_name;
                        console.log("LOGGED IN");
                        response.json(data);
                    } else {
                        throw new Error("Whoops!");
                    }
                }
            );
        })
        .catch(err => {
            console.log("LOGIN ", err);
            response.json({ error: err.message });
        });
});

app.get("*", (request, response) => {
    if (!request.session.userId && request.url != "/welcome") {
        response.redirect("/welcome");
    } else {
        response.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, () => {
    console.log("I'm listening.");
});
