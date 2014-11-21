'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Player Schema
 */
var PlayerSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        default: '',
        trim: true
    },
    lastName: {
        type: String,
        default: '',
        trim: true
    },
});

/**
 * Validations
 */
PlayerSchema.path('lastName').validate(function(lastName) {
    return lastName.length;
}, 'Last name cannot be blank');

/**
 * Statics
 */
PlayerSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Player', PlayerSchema);
