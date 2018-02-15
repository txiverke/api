const User = require('../user/userModel')
const Post = require('../post/postModel')
const Project = require('../project/projectModel')
const newErr = require('../../../util/errorStatus')


exports.list = async (req, res, next) => {
  try {
    const posts = await Post.count({})
    const users = await User.count({})
    const projects = await Project.count({})
    const response = { posts, users, projects }
    res.status(200).json(response)
  } catch (err) {
    next(newErr(err, '400'))
  }
}
