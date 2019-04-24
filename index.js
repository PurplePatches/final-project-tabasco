const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");

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

app.post("/register", (req, res) => {});

app.get("/welcome", (req, res) => {
    // if (req.session.userId) {
    //     res.redirect("/");
    // } else {
    //     res.sendFile(__dirname + "/index.html");
    // }
});

app.get("*", (req, res) => {
    // if (!req.session.userId && req.url != "/welcome") {
    //     res.redirect("/welcome");
    // } else {
    //     res.sendFile(__dirname + "/index.html");
    // }
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("S E R V E R  I S  O N L I N E");
});
