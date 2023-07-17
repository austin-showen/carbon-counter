const { Schema } = require('mongoose')

const tripSchema = new Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    miles: { type: String, required: true },
    carbonGrams: { type: String, required: true },
    weeklyFrequency: { type: String, required: false },
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = tripSchema
