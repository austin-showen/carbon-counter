const { Schema } = require('mongoose')

const usageSchema = new Schema(
  {
    country: { type: String, required: true },
    state: { type: String, required: false },
    watts: { type: String, required: true },
    hours: { type: String, required: true },
    kwh: { type: String, required: true },
    carbonGrams: { type: String, required: true },
    appliance: {
      type: Schema.Types.ObjectId,
      ref: 'Appliance',
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

module.exports = usageSchema
