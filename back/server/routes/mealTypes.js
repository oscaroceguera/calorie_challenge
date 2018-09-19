const { MealType } = require('../models/MealType')
const mealTypes = require('../data/mealTypes.json')

exports.addMealTypes = async (req, res) => {
  try {
    const data = await MealType.insertMany(mealTypes)
    res.send(data)
  } catch (e) {
    res.status(400).send(e)
  }
}
