(function() {
    'use strict';

    const { app } = require('../index');
    const db = require('./db');
    const { userIsLoggedIn } = require('./auth');

    /////////////////////////////
    // GET FRIEND INFORMATION //
    ///////////////////////////

    app.get('/api/friends', userIsLoggedIn, (req, res) => {
        db.getFriends(req.session.userId)
            .then(({ rows }) => {
                res.json(rows);
            })
            .catch(() => {
                res.sendStatus(404);
            });
    });

    //////////////////////////
    // SEND FRIEND REQUEST //
    /////////////////////////

    app.post('/api/friends/:recipient', userIsLoggedIn, (req, res) => {
        db.insertFriendRequest(req.session.userId, req.params.recipient).then(
            () => res.sendStatus(200)
        );
    });
})();
