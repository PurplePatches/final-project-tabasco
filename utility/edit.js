(function() {
    'use strict';

    const { app } = require('../index');
    const db = require('./db');
    const { userIsLoggedIn } = require('./auth');

    app.post('/edit', userIsLoggedIn, (req, res) => {
        db.updateBio(req.session.userId, req.body.bio).then(data => {
            res.json(data);
        });
    });
})();
