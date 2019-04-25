const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser');
// const csurf = require('csurf');
const bcrypt = require('bcryptjs')

const db = require('./db')


app.use(compression());

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

app.use(express.static('./src'))

app.use(cookieSession({
    secret: 'life is like a box of chocolate',
    maxAge: 1000 * 60 * 60 * 24 * 180// 180 days
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(csurf());

app.use((req, res, next) => {
    //instruct web browsers to block attempts to load the site in a frame.
    res.setHeader('x-frame-options', 'DENY');
    console.log(req.session.userid);
    res.cookie('mytoken', req.csrfToken())
    next();
})



// app.post('/logout', (req, res) => {
//     req.session = null;
//     res.sendStatus(200);
// })  ​

app.post('/register', (req, res) => {
    let {email, password} = req.body;
    let userid = null
    hashPassword(password).then(hashed => db.register(email, hashed))
        .then((data) => {
            if(data.rowCount === 0){
                return res.json({status: 'invalid'})
            }
            req.session.userid = data.rows[0].userid;
            res.json({status: 'valid'})
        })
    .catch(err => console.log('Error: ' + err))
})

app.post('/login', (req, res) => {
    let {email, password} = req.body; 
    let userid = null
    db.login(email)
        .then((data) => {
            if(data.rows.length === 0){              
                return false
            }
            userid = data.rows[0].userid
            return checkPassword(password, data.rows[0].password)
        })
        .then(authorized => {
         
            if(authorized){
                req.session.userid = userid;
                res.json({status: 'valid'})
            }else{
                res.json({status:'invalid'})
            } 
        })
    .catch(err => console.log('Error: ' + err))
})

app.get('/welcome', (req, res) => {
    if (req.session.userid > 0) {
      res.redirect('/');
    } else {
      res.sendFile(__dirname + '/index.html');
    }
})

app.get('*', (req, res) => {
    if (!req.session.userid > 0) {
        res.redirect('/welcome')
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});


app.listen(8080, function() {
    console.log("I'm listening.");
});

function hashPassword(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
}

function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(err, doesMatch) {
            if (err) {
                resolve
                (false);
            } else {
                resolve(doesMatch);
            }
        });
    });
}

// registration like in petition - res.json{succes: true}
