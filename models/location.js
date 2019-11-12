const mongoose = require("mongoose")
var Float = require('mongoose-float').loadType(mongoose);

//schema is the model of the schema collection
var schema = new mongoose.Schema({
    latitude: { type: Float, required: true },
    longitude: { type: Float, required: true },
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true }
}, { timestamps: true });

var Location = mongoose.model('Location', schema);

module.exports = Location