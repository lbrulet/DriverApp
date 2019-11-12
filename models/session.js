const mongoose = require("mongoose")

//schema is the model of the session collection
var schema = new mongoose.Schema({
    active: { type: Boolean, required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver',  required: true },
}, { timestamps: true });

var Session = mongoose.model('Session', schema);

module.exports = Session