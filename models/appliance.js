const { Schema } = require('mongoose')

const applianceSchema = new Schema(
  {
    name: { type: String, required: true },
    watts: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = applianceSchema
