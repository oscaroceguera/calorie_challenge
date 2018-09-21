const express = require('express')
const router = express.Router()

const { authenticate } = require('../middleware/authenticate')

const foodTypes = require('./foodTypes')
const mealTypes = require('./mealTypes')
const meal = require('./meal')
const summary = require('./summary')
const user = require('./user')

module.exports = (app) => {
  router.get('/', (req, res) => {
    res.send({ message: 'hola!' })
  })

  router.post('/users', user.addUser)
  router.post('/users/login', user.loginUser)
  router.get('/users/me', authenticate, user.getUser)
  router.delete('/users/me/token', authenticate, user.deleteToken)

  router.post('/catalogs/foodTypes', foodTypes.addFoodTypes)
  router.post('/catalogs/mealTypes', mealTypes.addMealTypes)
  router.get('/catalogs/foodTypes', authenticate, foodTypes.getFoodTypes)
  router.get('/catalogs/mealTypes', authenticate, mealTypes.getMealTypes)

  router.post('/meals', authenticate, meal.addMeal)
  router.get('/meals', authenticate, meal.getMeal)
  router.get('/meals/:uuid', authenticate, meal.getMealById)
  router.patch('/meals/:uuid', authenticate, meal.updateMeal)
  router.delete('/meals/:uuid', authenticate, meal.deleteMeal)

  router.get('/summary/byYear', authenticate, summary.getByYear)
  router.get('/summary/byMonth', authenticate, summary.getByMonth)
  router.get('/summary/byDay', authenticate, summary.getByDay)

  app.use('/api', router)
}
