const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const chalkAnimation = require("chalk-animation");
const bodyParser = require("body-parser");
const bcrypt = require("./bcrypt.js");
const csurf = require("csurf");
var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");
const s3 = require("./s3");
const config = require("./config");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

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

//---------      UPLOADER     --------------//

app.post("/uploader", uploader.single("file"), s3.upload, function(req, res) {
    const url = config.s3Url + req.file.filename;
    let userid = req.session.userId;
    let bio = req.body.bio;
    console.log("bio", bio);

    db.updateUsers(url, userid)
        .then(result => {
            console.log("results in updateusers", result);
        })
        .catch(err => {
            console.log("error in update users", err);
        });
    db.updateUsersBio(bio, userid)
        .then(result => {
            console.log("result in update users bio", result);
        })
        .catch(err => {
            console.log("error in updare users bio");
        });
    db.insertImage(url, userid)
        .then(function(results) {
            res.json(results.rows);
        })
        .catch(function(err) {
            console.log("err", err);
            res.json({
                success: false
            });
        });
});

//---------        REGISTER       ----------//

app.post("/register", (req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;

    bcrypt
        .hashPassword(password)
        .then(password => {
            if (
                firstname != undefined &&
                lastname != undefined &&
                email != undefined &&
                password != undefined
            ) {
                console.log(firstname, lastname, email, password);
            } else {
                res.json({ success: true });
            }

            db.addUsers(firstname, lastname, email, password)
                .then(password => {
                    req.session.userId = password.rows[0].id;
                    res.redirect("/");
                })
                .catch(err => {
                    console.log("error in Post Register...", err);
                    res.json({ success: false });
                });
        })
        .catch(err => {
            console.log("error in hash password", err);
            res.json({ success: false });
        });
});

//-----------        BIO         -----------------//

app.post("/bio", function(req, res) {
    let userid = req.session.userId;
    let bio = req.body.bio;
    console.log("bio", bio);

    db.updateUsersBio(bio, userid)
        .then(result => {
            console.log("result in update users bio", result);
            res.json({ success: true });
        })
        .catch(err => {
            console.log("error in updare users bio");
        });
});

//-----------         USERS       ----------------//
//
app.get("/users", (req, res) => {
    let id = req.session.userId;
    db.getUsersInformation(id)
        .then(results => {
            let data = results.rows[0];
            res.json(data);
        })
        .catch(err => {
            console.log("error in get Users Information", err);
        });
});

app.get("/api/users/:id", (req, res) => {
    console.log("GET IN USERS");
    let userId = req.params.id;
    if (req.params.id == req.session.userId) {
        res.json({
            redirect: true
        });
    }
    db.getUsersInformation(userId)
        .then(results => {
            let data = results.rows[0];
            console.log(data);
            res.json(data);
        })
        .catch(err => {
            console.log("error in users get", err);
        });
});

app.post("/api/users/:id", (req, res) => {
    console.log("POST IN USERS");

    let recipient_id = req.params.id;
    console.log("recipient_id", recipient_id);
    let requester_id = req.session.userId;
    console.log("requester_id", requester_id);
    let status = "Request Sended";

    db.sendRequest(requester_id, recipient_id, status).then(results => {
        console.log("results in send request", results);
        let status = results.rows[0];
        res.json(status);
    });
});

//-------------       WELCOME     ------------//

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//---------------- LOGIN -----------------------//

app.post("/login", async (req, res) => {
    let email = req.body.email;
    let newpassword = req.body.newpassword;

    let password = await db
        .getPassword(email)
        .then(result => {
            return result.rows[0].password;
        })
        .catch(err => {
            console.log("error in password", err);
            res.json({ success: false });
        });

    let checkPassword = await bcrypt
        .checkPassword(newpassword, password)
        .then(result => {
            if (result == true) {
                res.json({ success: true });
            } else {
                console.log("error in password");
                res.json({ success: false });
            }
        })
        .catch(err => {
            console.log("error on check password", err);
            res.json({ success: false });
        });
});

//----------    LOGOUT    ---------//

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

//-----------     *     --------------//

app.get("*", (req, res) => {
    if (!req.session.userId && req.url != "/welcome") {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//---------------------------------------//

app.listen(8080, function() {
    chalkAnimation.neon("L I S T E N I N G . . .");
});
