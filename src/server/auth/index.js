const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const config = require('../config')

console.log(config)

const checkToken = expressJwt({ secret: config.secrets.jwt })
const User = require('../api/blog/user/userModel')

exports.decodeToken = () => (req, res, next) => {
  if (req.headers && req.headers.access_token) {
    req.headers.authorization = `Bearer ${req.headers.access_token}`
  }

  checkToken(req, res, next)
}

exports.getFreshUser = () => (req, res, next) => {
  User.findById(req.user._id)
    .then(user => {
      if (!user) {
        res.status(401).send('Unauthorized')
      } else {
        req.user = user
        next()
      }
    }, err => {
      next(err)
    })
}


exports.verifyUser = () => (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  // if no username or password then send
  if (!username || !password) {
    return res.status(400).send('You need a username and password')
  }

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(401).send('No user with the given username')
      }

      if (!user.authenticate(password)) {
        return res.status(401).send('Wrong password')
      }

      req.user = user
      return next()
    }, err => next(err))
  return false
}

exports.signToken = (id) =>
  jwt.sign(
    { _id: id },
    config.secrets.jwt,
    { expiresIn: config.expireTime },
  )
