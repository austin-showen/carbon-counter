const mongoose = require('mongoose')
const userSchema = require('./user')
const vehicleSchema = require('./vehicle')

const User = mongoose.model('User', userSchema)
const Vehicle = mongoose.model('Vehicle', vehicleSchema)

module.exports = { User, Vehicle }
