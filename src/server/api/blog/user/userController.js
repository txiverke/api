// @flow

import User from './userModel'
import { signToken } from '../../../auth'

function newErr (err, state) {
  switch (err.status) {
    case '400': return res.status(err.status).json({ error: err })
    case '500': return res.status(err.status).json({ error: err })
    default: return res.status(500).json({ error: err })
  }
}

export const list = async (req: Object, res: Object) => {
  try {
    const users = await User.find({})
    res.status(200).json(users)
  } catch (err) {
    return newErr(err, '400')
  }
}

export const userById = async (req: Object, res: Object, next: Function, id: string) => {
  try {
    const user = await User.findById(id)
    req.user = user
    next()
  } catch (err) {
    return newErr(err, '400')
  }
}

export const update = async (req: Object, res: Object) => {
  try {
    const updatedUser = Object.assign(req.user, req.body)
    const user = await updatedUser.save()
    res.status(201).json(user)
  } catch (err) {
    return newErr(err, '400')
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
