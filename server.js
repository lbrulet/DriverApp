const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const database = require("./database/database")
const PORT = process.env.PORT || 8080
const login = require('./controllers/login')
const logout = require('./controllers/logout')
const location = require('./controllers/location')
const drivers = require('./controllers/drivers')

app.use(bodyParser.json());

//The main request of the api
app.get('/', function (req, res) {
    res.send({ message: "API SETUP BY @https://github.com/lbrulet/DriverApp" });
});

app.use('/api/auth', login)
app.use('/api/auth', logout)
app.use('/api/driver', location)
app.use('/api/drivers', drivers)

//Server start
app.listen(PORT, function (req, res) {
    console.log("Server launched.");
});

module.exports = app