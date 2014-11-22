'use strict';

var matches = require('../controllers/matches');

// Match authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.match.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Matches, app, auth) {
    
    app.route('/matches')
        .get(matches.all)
        .post(auth.requiresLogin, matches.create);
    app.route('/matches/:matchId')
        .get(matches.show)
        .put(auth.requiresLogin, hasAuthorization, matches.update)
        .delete(auth.requiresLogin, hasAuthorization, matches.destroy);

    // Finish with setting up the matchId param
    app.param('matchId', matches.match);
};
