const express = require("express")
const router = express.Router()
const Session = require('../models/session')
const jwt = require('jsonwebtoken')

router.post('/logout', function (req, res) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "Token missing" })
    }
    var token = req.headers.authorization.substring(7);
    jwt.verify(token, 'pingouin123', function (err, decoded) {
        if (err)
            return res.status(403).send({ message: err })
        Session.findById(decoded.id, function (err, session) {
            if (err)
                return res.status(403).send({ message: err })
            session.active = false
            session.save(function (err, result) {
                if (err)
                    return res.status(403).send({ message: err })
                return res.status(200).send({ message: "Session disable" })
            })
        })
    });
})

module.exports = router