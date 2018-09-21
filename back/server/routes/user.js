const _ = require('lodash')
var { User } = require('../models/user')

exports.addUser = (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])
  var user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }).catch((e) => {
    res.status(400).send(e)
  })
}

exports.loginUser = async (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])

  try {
    const user = await User.findByCredentials(body.email, body.password)
    const token = await user.generateAuthToken()
    res.header('x-auth', token).send(user)
  } catch (e) {
    res.status(400).send()
  }
}

exports.getUser = (req, res) => {
  res.send(req.user)
}

exports.deleteToken = async (req, res) => {
  try {
    await req.user.removeToken(req.token)
    res.status(200).send()
  } catch (e) {
    res.status(400).send(e)
  }
}
