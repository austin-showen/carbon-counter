const mongoose = require('mongoose')
const userSchema = require('./user')
const vehicleSchema = require('./vehicle')
const tripSchema = require('./trip')
const applianceSchema = require('./appliance')
const usageSchema = require('./usage')

const User = mongoose.model('User', userSchema)
const Vehicle = mongoose.model('Vehicle', vehicleSchema)
const Trip = mongoose.model('Trip', tripSchema)
const Appliance = mongoose.model('Appliance', applianceSchema)
const Usage = mongoose.model('Usage', usageSchema)

module.exports = { User, Vehicle, Trip, Appliance, Usage }
