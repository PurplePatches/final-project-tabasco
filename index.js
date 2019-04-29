const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
const config = require("./config");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const db = require("./db");
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
const express = require("express");
const multer = require("multer");
const passwords = require("./passwords");
const path = require("path");
const s3 = require("./s3");
const uidSafe = require("uid-safe");
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

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

///###########################################
///###########################################
///###########################################

app.post("/register", (req, res) => {
    const { firstname, lastname, email, password } = req.body;

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
    db.loadUser(email)
        .then(result => {
            if (result.rows.length == 0) {
                console.log("The login data is not matching any existing user");
                res.json({ success: false });
            }
            req.session.userId = result.rows[0].id;

            return passwords.compare(password, result.rows[0].password);
        })
        .then(result => {
            if (result) {
                // req.session.userId = result.rows[0].id;
                res.json({ success: true });
            } else {
                console.log("ERROR, wrong password!");
                res.json({ success: false });
            }
        })
        .catch(err => {
            console.log("ERROR", err);
        });
});

app.get("/user", (req, res) => {
    db.loadUserProfile(req.session.userId).then(results => {
        res.json(results.rows[0]);
    });
});

app.post("/uploadProfilePic", uploader.single("file"), s3.upload, function(
    req,
    res
) {
    const url = config.s3Url + req.file.filename;
    db.addImage(url)
        .then(newImage => {
            res.json(newImage.rows[0]);
        })
        .catch(err => {
            console.log("Error in uploading", err);
        });
});

app.get("/uploadProfilePic", (req, res) => {
    db.getImage(req.params.pageSize).then(image => {
        res.json(image.rows);
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
