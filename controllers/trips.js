const { Vehicle, User, Trip } = require('../models')
const mongoose = require('mongoose')

const create = async (req, res) => {
  const { username, miles, carbonGrams, date, vehicleId, apiId } = req.body
  const user = await User.findOne({ username })
  const vehicle = await Vehicle.findOne({ apiId: vehicleId })
  const trip = new Trip()
  try {
    trip.make = vehicle.make
    trip.model = vehicle.model
    trip.year = vehicle.year
    trip.miles = miles
    trip.carbonGrams = carbonGrams
    // trip.date = date
    trip.vehicle = vehicle._id
    trip.user = user._id
    trip.save()
    res.send(trip)
  } catch (error) {
    console.log(error)
  }
}

const index = async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ username })
  const trips = await Trip.find({ user: user._id })
  res.send(trips)
}

module.exports = { create, index }
