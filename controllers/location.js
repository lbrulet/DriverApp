const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const Session = require('../models/session')
const Location = require('../models/location')

router.post('/add-location/:id', function (req, res) {
    if (!req.body.latitude || !req.body.longitude)
        return res.status(403).send({ message: "Latitude or longitude missing." })
    var id = req.params.id
    Session.findById(id, function (err, result) {
        if (err)
            return res.status(403).send({ message: err })
        if (!res)
            return res.status(403).send({ message: "Session does not exist" })
        if (!result.active) {
            return res.status(403).send({ message: "Session is not active" })
        }
        var location = new Location()
        location.latitude = req.body.latitude
        location.longitude = req.body.longitude
        location.session = result._id
        location.save(function (err, result) {
            if (err)
                return res.status(403).send({ message: err })
            return res.status(200).send({ message: location })
        })
    })
})

module.exports = router