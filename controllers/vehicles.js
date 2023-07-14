const { Vehicle, User } = require('../models')
const mongoose = require('mongoose')

const create = async (req, res) => {
  const { email, make, model, year, apiId } = req.body
  const user = await User.findOne({ email })
  const vehicle = new Vehicle()
  try {
    vehicle.make = make
    vehicle.model = model
    vehicle.year = year
    vehicle.apiId = apiId
    vehicle.user = user._id
    vehicle.save()
    res.send(vehicle)
  } catch (error) {
    console.log(error)
  }
}

const index = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  const vehicles = await Vehicle.find({ user: user._id })
  res.send(vehicles)
}

module.exports = { create, index }