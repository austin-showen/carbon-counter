const mongoose = require('mongoose')
const userSchema = require('./User')
const vehicleSchema = require('./Vehicle')

const User = mongoose.model('User', userSchema)
const Vehicle = mongoose.model('Vehicle', vehicleSchema)

module.exports = { User, Vehicle }
