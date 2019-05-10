const express = require('express');
const app = express();
const compression = require('compression');
const db = require('./db');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const bodyParser = require('body-parser');
const s3 = require('./s3');
const config = require("./config");
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080 yourfunkychickenapp.herokuapp.com:*' });


app.use(require('cookie-parser')());

app.use(compression());

app.use(
    express.static('./public')
);

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always Hungary.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(bodyParser.json());

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie('mytoken', req.csrfToken());
    next();
});

////////////////////////////////////////////////////////
/////////////////SETTING BUNDLE SERVER//////////////////
////////////////////////////////////////////////////////


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

////////////////////////////////////////////////////////
///////MIDDLEWARE FOR USER NEED TO BE LOGGED IN///////////
////////////////////////////////////////////////////////

function LoggedInRequired (req, res, next) {
    if (!req.session.userID) {
        res.sendStatus(403);
    } else {
        next();
    }
}

////////////////////////////////////////////////////////
///////////////MULTER BOILERPLATE///////////////////////
////////////////////////////////////////////////////////

var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');

var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
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


////////////////////////////////////////////////////////
//////////////////////REGISTER ROUTE////////////////////
////////////////////////////////////////////////////////

app.post('/register', (req, res) => {
    if (req.body.pword != '') {
        db.pwordHash(req.body.pword).then(hashedInput => {
            return db.registerUser(req.body.fname, req.body.sname, req.body.email, hashedInput).then(data => {
                req.session.fname = req.body.fname;
                req.session.sname = req.body.sname;
                req.session.email = req.body.email;
                req.session.pword = hashedInput;
                req.session.userID = data.rows[0].id;
                res.json({success: true});
            });
        });
    } else {
        console.log('ERROR: CANNOT REGISTER!');
        res.json({success: false});
    }
});

////////////////////////////////////////////////////////
//////////////////////LOGIN ROUTE////////////////////
////////////////////////////////////////////////////////

app.post('/login', (req, res) => {
    if (req.body.email != '' && req.body.pword != '') {
        db.isMailInDB(req.body.email).then(data => {
            if (data.rowCount == 1) {
                db.allUserInfo(req.body.email).then(data => {
                    req.session.fname = data.rows[0].fname;
                    req.session.sname = data.rows[0].sname;
                    req.session.email = data.rows[0].email;
                    req.session.pword = data.rows[0].pword;
                    req.session.userID = data.rows[0].id;
                    db.pwordCompare(req.body.pword, data.rows[0].pword).then(bool => {
                        if (bool == true) {
                            res.json({success: true});
                        } else {
                            req.session = null;
                            res.json({success: false});
                        }
                    });
                });
            } else {
                req.session = null;
                res.json({success: false});
            }
        });
    } else {
        req.session = null;
        res.json({success: false});
    }
});


////////////////////////////////////////////////////////
//////////////////UPLOAD PIC AND BIO////////////////////
////////////////////////////////////////////////////////

app.post('/upload', uploader.single('file'), s3.upload, function(req, res) {
    db.uploadNewProfPic(config.s3Url + req.file.filename, req.session.userID).then(data => {
    });
});

app.post('/bio', (req, res) => {
    db.uploadBio(req.body.bio, req.session.userID).then(data => {
        res.json(data.rows[0]);
    });
});


////////////////////////////////////////////////////////
//////////////////////LOGOUT////////////////////////
////////////////////////////////////////////////////////
app.get("/logout", function(req, res) {
    req.session = null;
    res.redirect("/welcome");
});


////////////////////////////////////////////////////////
//////////////////////GET USER//////////////////////////
////////////////////////////////////////////////////////


app.get('/user', LoggedInRequired, (req, res) => {
    db.getUserInfo(req.session.userID).then(({rows}) => {
        const user = rows.pop();
        if (!user.pic) {
            user.pic = '/images/mario-default.jpg';
        } res.json(user);
    });
});

app.get('/users/:id', LoggedInRequired, (req, res) => {
    if (req.params.id != req.session.userID) {
        db.getUserInfo(req.params.id).then(({rows}) => {
            const user = rows.pop();
            if (!user.pic) {
                user.pic = '/images/mario-default.jpg';
            } res.json(user);
        }).catch(function(err){
            res.json({
                error: true
            });
        });
    } else {
        res.json({
            error: true
        });
    }
});

////////////////////////////////////////////////////////
//////////////////////FRIEND STATUS/////////////////////
////////////////////////////////////////////////////////

app.get('/friendship-status/:otherUserID', (req,res) => {
    db.getFrienshipStatus(req.session.userID, req.params.otherUserID).then(({rows}) => {
        res.json(rows);
    });
});

app.post('/request-friendship/:otherUserID', (req,res) => {
    db.setRelation(req.session.userID, req.params.otherUserID).then(({rows}) => {
        res.json(rows);
    });
});

app.post('/no-friendship/:otherUserID', (req,res) => {
    db.unfriend(req.session.userID, req.params.otherUserID).then(({rows}) => {
        res.json(rows);
    });
});

app.post('/friendship-with/:otherUserID', (req,res) => {
    db.befriend(req.session.userID, req.params.otherUserID).then(({rows}) => {
        res.json(rows);
    });
});

app.get('/connection', (req, res) => {
    db.getConnections(req.session.userID).then(({rows}) => {
        res.json(rows);
    });
});

////////////////////////////////////////////////////////
//////////////////////WELCOME PAGE//////////////////////
////////////////////////////////////////////////////////

app.get('/welcome', function(req, res) {
    if (req.session.userID) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});



app.get('*', function(req, res) {
    if (!req.session.userID) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

////////////////////////////////////////////////////////
//////////////////////SERVER//////////////////////
////////////////////////////////////////////////////////


server.listen(8080, function() {
    console.log('Listening!');
});


////////////////////////////////////////////////////////
//////////////////////SOCKET IO//////////////////////
////////////////////////////////////////////////////////

const onlineUsers = {};
var userIDs = [];
io.on('connect', (socket) => {
    console.log(`socket with the id ${socket.id} is now connected`);
    const {userID} = socket.request.session;
    if (!userID) {
        return socket.disconnect();
    }

    onlineUsers[socket.id] = userID;

    db.getUsersByIds(Object.values(onlineUsers)).then(({rows}) => {
        socket.emit('onlineUsers', {
            allOnlineUsers: rows,
            onlineUsers: rows.filter(rows => rows.id != userID)
        });
    });

    const alreadyHere = Object.values(onlineUsers).filter(id => id == userID).length > 1;

    if (!alreadyHere) {
        db.getUserInfo(userID).then(({rows}) => {
            socket.broadcast.emit('userJoined', {
                user: rows[0]
            });
        });
    }

    db.getMessages().then(({rows}) => {
        socket.emit('showMessages', rows.reverse());
    });

    socket.on('newMessage', data => {
        db.sendNewMessage(userID, data).then(({rows}) => {
            db.getMessages().then(({rows}) => {
                io.emit('showMessages', rows.reverse());
            });
        });
    });

    socket.on('disconnect', () => {
        delete onlineUsers[socket.id];
        for(var propName in onlineUsers) {
            if(userIDs.hasOwnProperty(propName)) {
                var propValue = onlineUsers[propName];
                userIDs.push(propValue);
            }
        }
        if (!userIDs.includes(userID)) {
            socket.broadcast.emit('userLeft', userID);
        }
    });
});