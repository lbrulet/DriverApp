const mongoose = require("mongoose")

//schema is the model of the users collection
var schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
}, { timestamps: true });

var Driver = mongoose.model('Driver', schema);

module.exports = Driver