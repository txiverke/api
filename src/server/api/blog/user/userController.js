// @flow

import User from './userModel'
import errorHandler from '../../../middleware/errorHandler'

export const list = async (req: Object, res: Object) => {
  try {
    const users = await User.find({})
    return res.status(200).json(users)
  } catch (err) {
    errorHandler(err, res)
  }
}

export const userById = async (req: Object, res: Object, next: Function, id: string) => {
  try {
    req.user = await User.findById(id)
    next()
  } catch (err) {
    console.log(err)
    errorHandler(err, res)
  }
}

export const update = async (req: Object, res: Object) => {
  try {
    const updatedUser = Object.assign(req.user, req.body)
    const user = await updatedUser.save()
    res.status(201).json(user)
  } catch (err) {
    errorHandler(err, res)
  }
}

export const read = (req: Object, res: Object) => {
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
