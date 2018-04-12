// @flow

import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from '../config'
import User from '../api/blog/user/userModel'
import errorHandler from '../middleware/errorHandler'

const checkToken = expressJwt({ secret: config.secrets.jwt })

export const decodeToken = () => (req: Object, res: Object, next: Function) => {
  if (req.headers && req.headers['access-token']) {
    req.headers.authorization = `Bearer ${req.headers['access-token']}`
  }

  checkToken(req, res, next)
}

export const getFreshUser = () => (req: Object, res: Object, next: Function) => {
  User.findById(req.user._id)
    .then(user => {
      if (!user) {
        return errorHandler({ name: 'UnauthorizedError' }, res)
      } else {
        req.user = user
        next()
      }
    }, err => {
      next(err)
    })
}


export const verifyUser = () => (req: Object, res: Object, next: Function) => {
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

export const signToken = (id: string) =>
  jwt.sign(
    { _id: id },
    config.secrets.jwt,
    { expiresIn: config.expireTime },
  )