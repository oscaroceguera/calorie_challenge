const { Meal } = require('../models/meal')
const { FoodType } = require('../models/foodType')
const { MealType } = require('../models/mealType')

exports.addMeal = async (req, res) => {
  try {
    let foods = []
    await Promise.all(req.body.foods.map(async (item) => {
      const resultado = await FoodType.findOne({ uuid: item })
      foods.push(resultado._id)
    }))

    req.body.foods = foods

    const mealType = await MealType.findOne({ uuid: req.body.mealType })
    req.body.mealType = mealType._id

    const meal = new Meal({
      meal: req.body.meal,
      date: req.body.date,
      foods: req.body.foods,
      mealType: req.body.mealType,
      _creator: req.user._id
    })

    const doc = await meal.save()
    res.send(doc)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.getMeal = async (req, res) => {
  try {
    const meals = await Meal.find({ _creator: req.user._id })
      .populate('foods')
      .populate('mealType')
      .sort('-date')

    res.send(meals)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.getMealById = async (req, res) => {
  const uuid = req.params.uuid
  try {
    const meal = await Meal.findOne({
      uuid: uuid,
      _creator: req.user._id
    })
      .populate('foods')
      .populate('mealType')

    if (!meal) {
      return res.status(404).send()
    }
    res.send(meal)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.updateMeal = async (req, res) => {
  const uuid = req.params.uuid
  const body = req.body
  let foods = []

  try {
    await Promise.all(body.foods.map(async (item) => {
      const resultado = await FoodType.findOne({ uuid: item })
      foods.push(resultado._id)
    }))

    body.foods = foods

    const mealType = await MealType.findOne({ uuid: body.mealType })
    body.mealType = mealType._id

    const meal = await Meal.findOneAndUpdate({ uuid: uuid }, { $set: body }, { new: true })

    if (!meal) {
      return res.status(404).send()
    }

    res.send(meal)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.deleteMeal = async (req, res) => {
  const uuid = req.params.uuid

  try {
    const meal = await Meal.findOneAndRemove({
      uuid: uuid,
      _creator: req.user._id
    })

    if (!meal) {
      return res.status(404).send()
    }

    res.send(meal)
  } catch (e) {
    res.status(404).send()
  }
}
