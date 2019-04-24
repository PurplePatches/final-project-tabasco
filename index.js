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
// app.use(csurf());
// app.use((request, response, next) => {
//     // response.setHeader("x-frame-options", "DENY");
//     response.locals.csrfToken = request.csrfToken();
//     next();
// });

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
            console.log("hashing an empty password???", err);
        });
});
app.get("/logout", (request, response) => {
    request.session = null;
    response.redirect("/");
});
app.get("/welcome", (request, response) => {
    if (request.session.userId) {
        response.redirect("/");
    } else {
        response.sendFile(__dirname + "/index.html");
    }
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
