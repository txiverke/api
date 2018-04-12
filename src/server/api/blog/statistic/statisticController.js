// @flow

import User from '../user/userModel'
import Post from '../post/postModel'
import Project from '../project/projectModel'
import errorHandler from '../../../middleware/errorHandler'

export const list = async (req: Object, res: Object, next: Function) => {
  try {
    const posts = await Post.count({})
    const users = await User.count({})
    const projects = await Project.count({})
    const response = { posts, users, projects }

    res.status(200).json(response)
  } catch (err) {
    return errorHandler(err, res)
  }
}
