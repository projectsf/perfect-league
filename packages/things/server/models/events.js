'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Event Schema
 */
var EventSchema = new Schema({
    created: {
        type: Date,
    },
    thingId: {
        type: String,
    },
    coords: {
        longitude: {
            type: Number
        },
        latitude: {
            type: Number,
        }
    },
    name: {
        type: String,
    }
});

/**
 * Validations
 */
EventSchema.path('thingId').validate(function(thingId) {
    return thingId.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
EventSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Event', EventSchema);
