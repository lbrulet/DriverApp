var mongoose = require('mongoose');
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);

var url = process.env.MONGO_URL ? "mongo" : "localhost"

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'testing') {
    mockgoose.prepareStorage().then(function () {
        mongoose.connect(`mongodb://${url}:27017/driverApp`, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
            console.log('Connected to mockgoose');
        });
    });
} else {
    mongoose.connect(`mongodb://${url}:27017/driverApp`, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) {
            throw err;
        }
        console.log(`Connected to ${url}`);
    });
}