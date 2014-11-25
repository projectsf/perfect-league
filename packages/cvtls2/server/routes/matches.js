'use strict';

var matches = require('../controllers/matches');

module.exports = function(Matches, app, auth) {
    
    app.route('/matches')
        .get(matches.all)
        .post(auth.requiresLogin, matches.create);
    app.route('/matches/:matchId')
        .get(matches.show)
        .put(auth.requiresLogin, matches.update)
        .delete(auth.requiresLogin, matches.destroy);
    app.route('/matches/:matchId/post-result')
        .put(auth.requiresLogin, matches.update);

    // Finish with setting up the matchId param
    app.param('matchId', matches.match);
};
