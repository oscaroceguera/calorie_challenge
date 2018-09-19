const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4 } = require('uuid')

const MealTypeSchema = new Schema({
  uuid: { type: String, default: v4 },
  value: { type: String }
}, { timestamps: true })

const MealType = mongoose.model('MealType', MealTypeSchema)
module.exports = { MealType }
