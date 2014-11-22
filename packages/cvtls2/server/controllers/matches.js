'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Match = mongoose.model('Match'),
    _ = require('lodash');


/**
 * Find match by id
 */
exports.match = function(req, res, next, id) {
    Match.load(id, function(err, match) {
        if (err) return next(err);
        if (!match) return next(new Error('Failed to load match ' + id));
        req.match = match;
        next();
    });
};

/**
 * Create an match
 */
exports.create = function(req, res) {
    var match = new Match(req.body);
    match.user = req.user;

    match.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                match: match
            });
        } else {
            res.jsonp(match);
        }
    });
};

/**
 * Update an match
 */
exports.update = function(req, res) {
    var match = req.match;

    match = _.extend(match, req.body);

    match.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                match: match
            });
        } else {
            res.jsonp(match);
        }
    });
};

/**
 * Delete an match
 */
exports.destroy = function(req, res) {
    var match = req.match;

    match.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                match: match
            });
        } else {
            res.jsonp(match);
        }
    });
};

/**
 * Show an match
 */
exports.show = function(req, res) {
    res.jsonp(req.match);
};

/**
 * List of Matches
 */
exports.all = function(req, res) {
    Match.find().sort('-created').populate('user', 'name username').exec(function(err, matches) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(matches);
        }
    });
};
