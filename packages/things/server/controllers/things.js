'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    _ = require('lodash');


/**
 * Find thing by id
 */
exports.thing = function(req, res, next, id) {
    Thing.load(id, function(err, thing) {
        if (err) return next(err);
        if (!thing) return next(new Error('Failed to load thing ' + id));
        req.thing = thing;
        next();
    });
};

/**
 * Create an thing
 */
exports.create = function(req, res) {
    var thing = new Thing(req.body);
    thing.user = req.user;

    thing.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                thing: thing
            });
        } else {
            res.jsonp(thing);
        }
    });
};

/**
 * Update an thing
 */
exports.update = function(req, res) {
    var thing = req.thing;

    thing = _.extend(thing, req.body);

    thing.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                thing: thing
            });
        } else {
            res.jsonp(thing);
        }
    });
};

/**
 * Delete an thing
 */
exports.destroy = function(req, res) {
    var thing = req.thing;

    thing.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                thing: thing
            });
        } else {
            res.jsonp(thing);
        }
    });
};

/**
 * Show an thing
 */
exports.show = function(req, res) {
    res.jsonp(req.thing);
};

/**
 * List of Things
 */
exports.all = function(req, res) {
    Thing.find().sort('-created').populate('user', 'name username').exec(function(err, things) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(things);
        }
    });
};
