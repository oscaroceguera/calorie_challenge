const express = require('express')
const router = express.Router()

const foodTypes = require('./foodTypes')
const mealTypes = require('./mealTypes')
const Meal = require('./Meal')

module.exports = (app) => {
  router.get('/', (req, res) => {
    res.send({ message: 'hola!' })
  })

  router.post('/catalogs/foodTypes', foodTypes.addFoodTypes)
  router.post('/catalogs/mealTypes', mealTypes.addMealTypes)
  router.get('/catalogs/foodTypes', foodTypes.getFoodTypes)
  router.get('/catalogs/mealTypes', mealTypes.getMealTypes)
  router.post('/meals', Meal.addMeal)
  router.get('/meals', Meal.getMeal)
  router.get('/meals/:uuid', Meal.getMealById)
  router.patch('/meals/:uuid', Meal.updateMeal)
  router.delete('/meals/:uuid', Meal.deleteMeal)

  app.use('/api', router)
}
