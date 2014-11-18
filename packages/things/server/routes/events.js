'use strict';

var events = require('../controllers/events');

// Thing authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.event.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(Things, app, auth) {
    
    app.route('/events')
        .get(events.all)
        .post(auth.requiresLogin, events.create);
    app.route('/events/:eventId')
        .get(events.show)
        .put(auth.requiresLogin, hasAuthorization, events.update)
        .delete(auth.requiresLogin, hasAuthorization, events.destroy);

    // Finish with setting up the eventId param
    app.param('eventId', events.event);
};
