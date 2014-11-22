'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Player = mongoose.model('Player'),
    _ = require('lodash');


/**
 * Find player by id
 */
exports.player = function(req, res, next, id) {
    Player.load(id, function(err, player) {
        if (err) return next(err);
        if (!player) return next(new Error('Failed to load player ' + id));
        req.player = player;
        next();
    });
};

/**
 * Create an player
 */
exports.create = function(req, res) {
    var player = new Player(req.body);
    player.user = req.user;

    player.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                player: player
            });
        } else {
            res.jsonp(player);
        }
    });
};

/**
 * Update an player
 */
exports.update = function(req, res) {
    var player = req.player;

    player = _.extend(player, req.body);

    player.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                player: player
            });
        } else {
            res.jsonp(player);
        }
    });
};

/**
 * Delete an player
 */
exports.destroy = function(req, res) {
    var player = req.player;

    player.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                player: player
            });
        } else {
            res.jsonp(player);
        }
    });
};

/**
 * Show an player
 */
exports.show = function(req, res) {
    res.jsonp(req.player);
};

/**
 * List of Players
 */
exports.all = function(req, res) {
    Player.find().sort('-created').populate('user', 'name username').exec(function(err, players) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(players);
        }
    });
};
