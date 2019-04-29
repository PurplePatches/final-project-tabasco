const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser');
const csurf = require('csurf');
const bcrypt = require('bcryptjs')
const fs = require('fs');
const knox = require('knox-s3');
const multer = require('multer');
const uidSafe = require('uid-safe')
const path = require('path')

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
});

app.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('/welcome')
});

//handles file uploads ==>
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
      uidSafe(24).then(function(uid) {
          callback(null, uid + path.extname(file.originalname));
      });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
//<===

// handles S3 ===>
let secrets;
if (process.env.NODE_ENV === 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('./secrets.json'); // secrets.json is in .gitignore
}

const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: 'tabascoimageboard'
});

function uploadToAWS(req, res, next) {
    // console.log('uploadAWS');
    
    if (!req.file) {
        console.log('no file');
        
        return res.sendStatus(500);
    }
    const s3Request = client.put(req.file.filename, {
        'Content-Type': req.file.mimetype,
        'Content-Length': req.file.size,
        'x-amz-acl': 'public-read'
    });
    const stream = fs.createReadStream(req.file.path);
    stream.pipe(s3Request);

    s3Request.on('response', s3Response => {
        // console.log(s3Response.statusCode, req);
        if (s3Response.statusCode == 200) {
            next();
            fs.unlink(req.file.path, () => {});
        } else {
            res.sendStatus(500);
        }
    });
};

//<====
app.post('/picture', uploader.single('file'), uploadToAWS, function(req, res) {
    // If nothing went wrong the file is already in the uploads directory
        // console.log('was here');
        
        const url = 'https://s3.amazonaws.com/tabascoimageboard/' + req.file.filename
        res.json({url})
        db.saveImage(url, req.session.userid)
});

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

app.post('/profile', (req, res) => {
    console.log(req.body);
    db.updateProfile(req.body.data, req.session.userid)
        .then(() => res.json({succes: true}))
    
})

app.post('/passwordemail', (req, res) => {
    console.log(req.body);
    if(req.body.password) {
        hashPassword(req.body.password)
            .then(hashed => db.updatePasswordEmail(req.session.userid, req.body.email, hashed))
            .then(() => res.json({succes: true}))
    }else{
        db.updatePasswordEmail(req.session.userid, req.body.email)
            .then(() => res.json({succes: true}))
    }    
})

app.get('/profile', (req, res) => {
    Promise.all([
        db.getProfile(req.session.userid),
        db.getImages(req.session.userid)
    ])
    .then(data => {
        for (const prop in data[0].rows[0]){
            if(data[0].rows[0][prop] === null) data[0].rows[0][prop] = ''
        }
        const {email, bio, dogname, dogbreed, first, last, location} = data[0].rows[0]
        const profilePic = data[1].rows.length > 0 ? data[1].rows[0].url : ''
        res.json({email, bio, dogname, dogbreed, first, last, location, profilePic})  
    })
    .catch(err => console.log(err))
});


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
