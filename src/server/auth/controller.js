const signToken = require('./index').signToken

exports.signin = (req, res) => {
  const token = signToken(req.user._id)
  return res.json({ token })
}
