const { Vehicle, User, Trip } = require('../models')
const mongoose = require('mongoose')

const create = async (req, res) => {
  const { username, miles, carbonGrams, vehicleId } = req.body
  const user = await User.findOne({ username })
  const vehicle = await Vehicle.findOne({ apiId: vehicleId })
  const trip = new Trip()
  try {
    trip.make = vehicle.make
    trip.model = vehicle.model
    trip.year = vehicle.year
    trip.miles = miles
    trip.carbonGrams = carbonGrams
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

const deleteTrip = async (req, res) => {
  const { id } = req.params
  try {
    await Trip.deleteOne({ _id: id })
    res.send('Deleted trip')
  } catch (error) {
    throw error
  }
}

module.exports = { create, index, delete: deleteTrip }
