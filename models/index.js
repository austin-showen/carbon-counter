const mongoose = require('mongoose')
const userSchema = require('./user')
const vehicleSchema = require('./vehicle')
const tripSchema = require('./trip')

const User = mongoose.model('User', userSchema)
const Vehicle = mongoose.model('Vehicle', vehicleSchema)
const Trip = mongoose.model('Trip', tripSchema)

module.exports = { User, Vehicle, Trip }
