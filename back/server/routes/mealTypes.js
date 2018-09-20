const { MealType } = require('../models/mealType')
const mealTypes = require('../data/mealTypes.json')

exports.addMealTypes = async (req, res) => {
  try {
    const data = await MealType.insertMany(mealTypes)
    res.send(data)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.getMealTypes = async (req, res) => {
  try {
    const data = await MealType.find()
    res.send(data)
  } catch (e) {
    res.status(400).send(e)
  }
}
