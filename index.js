const express = require("express");
const app = (exports.app = express());

const compression = require("compression");
app.use(compression());

// const db = require("./db");

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => {
        res.sendFile(`${__dirname}/bundle.js`);
    });
}

require("./routers/validation");
require("./routers/profile");
require("./routers/otherusers");

app.use(express.static("./public"));

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

app.listen(8080, () => {
    console.log("I'm listening.");
});
