// @flow

import fs from 'fs'
import Post from './postModel'
import errorHandler from '../../../middleware/errorHandler'

function removeAsset(path, res) {
  fs.unlink(`./public/blog/img/${path}`, err => {
    if (err) return errorHandler(err, res)
    return false
  })
}

export const list = async (req: Object, res: Object) => {
  try {
    const posts = await Post.find({})
      .populate('creator')
      .exec()
    res.status(200).json(posts)
  } catch (err) {
    return errorHandler(err, res)
  }
}

export const create = async (req: Object, res: Object) => {
  try {
    const background = (req.file && req.file !== 'undefined') ? req.file.filename : ''
    const postObj = Object.assign({}, req.body, { background })
    const newPost = new Post(postObj)
    await newPost.save()
    const posts = await Post.find({})
    res.status(201).json(posts)
  } catch (err) {
    return errorHandler(Object.assign(err, { status: '500' }), res)
  }
}

export const postById = async (req: Object, res: Object, next: Function, id: string) => {
  try {
    const post = await Post.findById(id)
    req.post = post
    next()
  } catch (err) {
    return errorHandler(Object.assign(err, { status: '404' }), res)
  }
}

export const read = (req: Object, res: Object) => res.status(200).json(req.post)

export const update = async (req: Object, res: Object) => {
  try {
    let background = ''

    if (req.file && req.file !== 'undefined') {
      await removeAsset(`posts/${req.post.background}`, res)
      background = req.file.filename
    } else {
      background = req.post.background
    }
    const postToUpdate = Object.assign(req.post, req.body, { background })
    await postToUpdate.save()
    const posts = await Post.find({})
    return res.status(200).json(posts)
  } catch (err) {
    return errorHandler(Object.assign(err, { status: '400' }), res)
  }
}

export const remove = async (req: Object, res: Object) => {
  try {
    const postToRemove = req.post
    if(req.post.background) await removeAsset(`posts/${postToRemove.background}`, res)
    await postToRemove.remove()
    const posts = await Post.find({})
    return res.status(200).json(posts)
  } catch (err) {
    return errorHandler(Object.assign(err, { status: '404' }), res)
  }
}
