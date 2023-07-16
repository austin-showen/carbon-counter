const { Appliance, User } = require('../models')
const mongoose = require('mongoose')

const create = async (req, res) => {
  const { username, name, watts } = req.body
  const user = await User.findOne({ username })
  const appliance = new Appliance()
  try {
    appliance.name = name
    appliance.watts = watts
    appliance.user = user._id
    appliance.save()
    res.send(appliance)
  } catch (error) {
    console.log(error)
  }
}

const index = async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ username })
  const appliances = await Appliance.find({ user: user._id })
  res.send(appliances)
}

module.exports = { create, index }
