// @flow

import fs from 'fs'
import Post from './postModel'
import newErr from '../../../util/errorStatus'

function removeAsset(path, next) {
  fs.unlink(`./public/blog/img/${path}`, err => {
    if (err) return next(newErr(err, '400'))
    return false
  })
}

export const list = async (req: Object, res: Object, next: Function) => {
  try {
    const posts = await Post.find({})
      .populate('creator')
      .exec()
    res.status(200).json(posts)
  } catch (err) {
    next(Object.assign({}, err, { status: 400 }))
  }
}

export const create = async (req: Object, res: Object, next: Function) => {
  try {
    const background = (req.file && req.file !== 'undefined') ? req.file.filename : ''
    const postObj = Object.assign({}, req.body, { background })
    const newPost = new Post(postObj)
    await newPost.save()
    const posts = await Post.find({})
    res.status(201).json(posts)
  } catch (err) {
    next(Object.assign({}, err, { status: 400 }))
  }
}

export const postById = async (req: Object, res: Object, next: Function, id: string) => {
  try {
    const post = await Post.findById(id)
    req.post = post
    next()
  } catch (err) {
    next(Object.assign({}, err, { status: 400 }))
  }
}

export const read = (req: Object, res: Object) => res.status(200).json(req.post)

export const update = async (req: Object, res: Object, next: Function) => {
  try {
    let background = ''

    if (req.file && req.file !== 'undefined') {
      await removeAsset(`posts/${req.post.background}`, next)
      background = req.file.filename
    } else {
      background = req.post.background
    }
    const postToUpdate = Object.assign(req.post, req.body, { background })
    await postToUpdate.save()
    const posts = await Post.find({})
    return res.status(200).json(posts)
  } catch (err) {
    return next(Object.assign({}, err, { status: 400 }))
  }
}

export const remove = async (req: Object, res: Object, next: Function) => {
  try {
    const postToRemove = req.post
    if(req.post.background) await removeAsset(`posts/${postToRemove.background}`, next)
    await postToRemove.remove()
    const posts = await Post.find({})
    return res.status(200).json(posts)
  } catch (err) {
    return next(Object.assign({}, err, { status: 400 }))
  }
}
