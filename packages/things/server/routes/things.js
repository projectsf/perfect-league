'use strict';

var things = require('../controllers/things');

// Thing authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.thing.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Things, app, auth) {
    
    app.route('/things')
        .get(things.all)
        .post(auth.requiresLogin, things.create);
    app.route('/things/:thingId')
        .get(things.show)
        .put(auth.requiresLogin, hasAuthorization, things.update)
        .delete(auth.requiresLogin, hasAuthorization, things.destroy);

    // Finish with setting up the thingId param
    app.param('thingId', things.thing);
};
