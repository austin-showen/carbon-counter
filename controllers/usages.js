const { Appliance, User, Usage } = require('../models')
const mongoose = require('mongoose')

const create = async (req, res) => {
  const { username, region, hours, carbonGrams, applianceId, recurring } =
    req.body
  const user = await User.findOne({ username })
  const appliance = await Appliance.findOne({ _id: applianceId })
  const usage = new Usage()
  try {
    usage.country = region.country
    if (region.state) usage.state = region.state
    usage.carbonGrams = carbonGrams
    usage.watts = appliance.watts
    usage.hours = hours
    usage.kwh = (appliance.watts * hours) / 1000
    usage.recurring = recurring
    usage.applianceName = appliance.name
    usage.appliance = applianceId
    usage.user = user._id
    usage.save()
    res.send(usage)
  } catch (error) {
    console.log(error)
  }
}

const index = async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ username })
  const usages = await Usage.find({ user: user._id })
  res.send(usages)
}

const deleteUsage = async (req, res) => {
  const { id } = req.params
  try {
    await Usage.deleteOne({ _id: id })
    res.send('Deleted usage')
  } catch (error) {
    throw error
  }
}

module.exports = { create, index, delete: deleteUsage }
