(function() {
    'use strict';

    const { app } = require('../index');
    const db = require('./db');
    const { userIsLoggedIn } = require('./auth');

    /////////////////////////////
    // GET FRIEND INFORMATION //
    ///////////////////////////

    app.get('/api/friends/:recipient', userIsLoggedIn, (req, res) => {
        db.getFriends(req.session.userId, req.params.recipient)
            .then(({ rows }) => {
                console.log('ROWS: ', rows);
                res.json({ friendship: rows, success: true });
            })
            .catch(() => {
                res.sendStatus(404);
            });
    });

    //////////////////////////
    // SEND FRIEND REQUEST //
    /////////////////////////

    app.post('/api/friends/:recipient/send', userIsLoggedIn, (req, res) => {
        db.insertFriendRequest(req.session.userId, req.params.recipient).then(
            () => res.sendStatus(200)
        );
    });

    ///////////////////////////////////////
    // CANCEL FRIEND REQUEST / UNFRIEND //
    /////////////////////////////////////

    app.post('/api/friends/:recipient/delete', userIsLoggedIn, (req, res) => {
        db.deleteFriendRequest(req.session.userId, req.params.recipient).then(
            () => res.sendStatus(200)
        );
    });

    ////////////////////////////
    // ACCEPT FRIEND REQUEST //
    //////////////////////////

    app.post('/api/friends/:recipient/accept', userIsLoggedIn, (req, res) => {
        db.acceptFriendRequest(req.session.userId, req.params.recipient).then(
            () => res.sendStatus(200)
        );
    });
})();
