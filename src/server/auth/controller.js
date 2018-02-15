const User = require('../api/blog/user/userModel')
const signToken = require('./index').signToken

exports.signin = (req, res, next) => {
  const token = signToken(req.user._id)
  res.json({ token })
}