const express = require("express")
const router = express.Router()
const Driver = require('../models/driver')
const Session = require('../models/session')
const Location = require('../models/location')

router.get('/', function (req, res) {
    Driver.aggregate([
        {
            $lookup: {
                from: "sessions",
                localField: "_id",
                foreignField: "driver",
                as: "sessions"
            },
        }]).exec(function (err, result) {
            if (err)
                return res.status(403).send({ message: err })
            return res.status(200).send({ message: result })
        })
})

router.get('/search', function (req, res) {
    var firstname = req.query.firstname || "";
    var lastname = req.query.lastname || "";

    Driver.find({ 'firstName': new RegExp('^' + firstname, "i"), 'lastName': new RegExp('^' + lastname, "i") }).select('_id firstName lastName').populate('session').exec(function (err, results) {
        if (err)
            return res.status(403).send({ message: err })
        return res.status(200).send({ message: results })
    });
})

router.get('/:id', function (req, res) {
    var id = req.params.id
    Driver.findOne().where({ _id: id }).select('_id firstName lastName').exec(function (err, result) {
        if (err)
            return res.status(403).send({ message: err })
        return res.status(200).send({ message: result })
    })
})

router.get('/:id/inactive-session', function (req, res) {
    var id = req.params.id
    Driver.findOne().where({ _id: id }).select('_id firstName lastName').exec(function (err, result) {
        if (err)
            return res.status(403).send({ message: err })
        Session.find({ driver: result._id, active: false }).select('_id active').exec(function (err, result) {
            if (err)
                return res.status(403).send({ message: err })
            return res.status(200).send({ message: result })
        })
    })
})

router.get('/:id/location', function (req, res) {
    var id = req.params.id
    Driver.findOne().where({ _id: id }).select('_id firstName lastName').exec(function (err, result) {
        if (err)
            return res.status(403).send({ message: err })
        Session.find({ driver: result._id, active: true }).exec(function (err, result) {
            if (err)
                return res.status(403).send({ message: err })
            if (result.length == 0) {
                return res.status(403).send({ message: "This driver is not active" })
            }
            Location.find({ session: result[0]._id }).select('_id latitude longitude createdAt').exec(function (err, result) {
                if (err)
                    return res.status(403).send({ message: err })
                return res.status(200).send({ message: result })
            })
        })
    })
})

module.exports = router