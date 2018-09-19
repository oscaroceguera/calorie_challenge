const express = require('express')
const router = express.Router()

module.exports = (app) => {
  router.get('/', (req, res) => {
    res.send({ message: 'hola!' })
  })

  app.use('/api', router)
}