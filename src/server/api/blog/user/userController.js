const User = require('./userModel')
//const signToken = require('../../../auth').signToken
//const newErr = require('../../../util/errorStatus')

function newErr (err, state) {
  switch (err.status) {
    case '400': return res.status(err.status).json({ error: err })
    case '500': return res.status(err.status).json({ error: err })
    default: return res.status(500).json({ error: err })
  }
}

exports.list = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json(users)
  } catch (err) {
    return newErr(err, '400')
  }
}

exports.create = async (req, res) => {
  const newUser = new User(req.body)

  try {
    const user = await newUser.save()
    const token = await signToken(user._id)
    res.status(200).json({ token })
  } catch (err) {
    return newErr(err, '400')
  }
}

exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    req.user = user
    next()
  } catch (err) {
    return newErr(err, '400')
  }
}

exports.update = async (req, res) => {
  try {
    const updatedUser = Object.assign(req.user, req.body)
    const user = await updatedUser.save()
    res.status(201).json(user)
  } catch (err) {
    return newErr(err, '400')
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

exports.read = (req, res) => {
  const user = {
    _id: req.user._id,
    bio: req.user.bio,
    bio_cat: req.user.bio_cat,
    firstname: req.user.firstname,
    job: req.user.job,
    job_cat: req.user.job_cat,
    lastname: req.user.lastname,
    username: req.user.username,
  }

  return res.status(200).json(user)
}
