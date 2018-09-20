const { FoodType } = require('../models/foodType')
const foodTypes = require('../data/foodTypes.json')

exports.addFoodTypes = async (req, res) => {
  try {
    const data = await FoodType.insertMany(foodTypes)
    res.send(data)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.getFoodTypes = async (req, res) => {
  try {
    const data = await FoodType.find()
    res.send(data)
  } catch (e) {
    res.status(400).send(e)
  }
}
