module.exports = {
    isLoggedIn,
    isLoggedOut
};

function isLoggedOut(req, res, next) {
    if (!req.session.userId && req.url != "/register" && req.url != "/login") {
        return res.redirect("/welcome");
    }
    next();
}

function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        next();
    }
}
