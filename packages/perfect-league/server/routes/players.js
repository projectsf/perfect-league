'use strict';

var players = require('../controllers/players');

// Player authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.player.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Players, app, auth) {
    
    app.route('/players')
        .get(players.all)
        .post(auth.requiresLogin, players.create);
    app.route('/players/:playerId')
        .get(players.show)
        .put(auth.requiresLogin, hasAuthorization, players.update)
        .delete(auth.requiresLogin, hasAuthorization, players.destroy);

    // Finish with setting up the playerId param
    app.param('playerId', players.thing);
};
