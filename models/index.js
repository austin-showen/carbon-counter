const mongoose = require('mongoose')
const userSchema = require('./user')
const vehicleSchema = require('./vehicle')
const tripSchema = require('./trip')
const applianceSchema = require('./appliance')

const User = mongoose.model('User', userSchema)
const Vehicle = mongoose.model('Vehicle', vehicleSchema)
const Trip = mongoose.model('Trip', tripSchema)
const Appliance = mongoose.model('Appliance', applianceSchema)

module.exports = { User, Vehicle, Trip, Appliance }
