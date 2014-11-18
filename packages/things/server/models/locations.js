'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Location Schema
 */
var LocationSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    thingId: {
        type: String,
        default: '',
        trim: true
    },
    coords: {
        longitude: {
            type: Number,
            default: '0'
        },
        latitude: {
            type: Number,
            default: '0'
        },
    },
});

/**
 * Validations
 */
LocationSchema.path('thingId').validate(function(thingId) {
    return thingId.length;
}, 'Thing cannot be blank');

/**
 * Statics
 */
LocationSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Location', LocationSchema);
