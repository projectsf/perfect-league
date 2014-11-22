'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Match Schema
 */
var MatchSchema = new Schema({
	roundNumber : { type : Number}, 
	matchNumber : { type : Number}, 
	players : {
		playerOne : {
			firstName : { type: String },
			lastName : { type: String }
		},
		playerTwo : {
			firstName : { type: String },
			lastName : { type: String }
		}
	}
});

/**
 * Statics
 */
MatchSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Match', MatchSchema);
