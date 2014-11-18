'use strict';

var locations = require('../controllers/locations');

// Thing authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.location.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Things, app, auth) {
    
    app.route('/locations')
        .get(locations.all)
        .post(auth.requiresLogin, locations.create);
    app.route('/locations/:locationId')
        .get(locations.show)
        .put(auth.requiresLogin, hasAuthorization, locations.update)
        .delete(auth.requiresLogin, hasAuthorization, locations.destroy);

    // Finish with setting up the locationId param
    app.param('locationId', locations.location);
};
