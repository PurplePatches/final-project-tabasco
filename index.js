const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');

app.use(compression());

app.use(cookieSession({
    secret: 'blah'
}))

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static('./public'));

app.post('/register', (req, res) => {

});

app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/welcome');
});

app.get('/welcome', function(req, res) {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('*', function(req, res) {
    if (!req.session.userId) {
        res.redirect('/welcome')
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
