const User = require('./userModel')
const signToken = require('../../../auth').signToken
const newErr = require('../../../util/errorStatus')

exports.list = async (req, res, next) => {
  try {
    const users = await User.find({})
    res.status(200).json(users)
  } catch (err) {
    next(newErr(err, '400'))
  }
}

exports.create = async (req, res, next) => {
  const newUser = new User(req.body)

  try {
    const user = await newUser.save()
    const token = await signToken(user._id)
    res.status(200).json({ token })
  } catch (err) {
    next(newErr(err, '400'))
  }
}

exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    req.user = user
    next()
  } catch (err) {
    next(newErr(err, '400'))
  }
}

exports.update = async (req, res, next) => {
  try {
    const updatedUser = Object.assign(req.user, req.body)
    const user = await updatedUser.save()
    res.status(201).json(user)
  } catch (err) {
    next(newErr(err, '400'))
  }
}

exports.delete = (req, res, next) => {
  req.user.remove((err, removed) => {
    if (err) {
      next(err)
    } else {
      res.json(removed)
    }
  })
}

exports.read = (req, res, next) => {
  const user = {
    _id: req.user._id,
    bio: req.user.bio,
    firstname: req.user.firstname,
    job: req.user.job,
    lastname: req.user.lastname,
    username: req.user.username,
  }

  return res.status(200).json(user)
}
