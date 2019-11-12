const express = require("express")
const router = express.Router()
const Driver = require('../models/driver')
const Session = require('../models/session')
const jwt = require('jsonwebtoken')

router.post('/login', function (req, res) {
    if (!req.body.first_name || !req.body.last_name)
        return res.status(403).send({ message: "Last name or first name missing!" })
    Driver.findOne({ firstName: req.body.first_name, lastName: req.body.last_name }, function (err, driver) {
        if (!driver) {
            var new_driver = new Driver()
            new_driver.firstName = req.body.first_name
            new_driver.lastName = req.body.last_name
            new_driver.save(function (err, result) {
                if (err)
                    return res.status(403).send({ message: err })
                var session = new Session()
                session.driver = new_driver._id
                session.active = true
                session.save(function (err, result) {
                    if (err)
                        return res.status(403).send({ message: err })
                    var token = jwt.sign({ id: session._id, driver_id: new_driver._id }, "pingouin123");
                    return res.status(200).send({ message: { driver: new_driver, session: session, token: token } })
                })
            })
        } else {
            Session.findOne({ active: true, driver: driver._id }).exec(function (err, sess) {
                if (err)
                    return res.status(403).send({ message: err })
                if (sess) {
                    var token = jwt.sign({ id: sess._id, driver_id: driver._id }, "pingouin123");
                    return res.status(200).send({ message: { driver: driver, session: sess, token: token } })
                } else {
                    var session = new Session()
                    session.driver = driver._id
                    session.active = true
                    session.save(function (err, result) {
                        if (err)
                            return res.status(403).send({ message: err })
                        var token = jwt.sign({ id: session._id, driver_id: driver._id }, "pingouin123");
                        return res.status(200).send({ message: { driver: driver, session: session, token: token } })
                    })
                }
            })
        }
    })
})
module.exports = router
