const express = require('express')
const router = express.Router()

const foodTypes = require('./foodTypes')
const mealTypes = require('./mealTypes')

module.exports = (app) => {
  router.get('/', (req, res) => {
    res.send({ message: 'hola!' })
  })

  router.post('/catalogs/foodTypes', foodTypes.addFoodTypes)
  router.post('/catalogs/mealTypes', mealTypes.addMealTypes)

  app.use('/api', router)
}
