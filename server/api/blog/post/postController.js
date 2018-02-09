const fs = require('fs')

const Post = require('./postModel')
const newErr = require('../../../util/errorStatus')

exports.list = async (req, res, next) => {
  try {
    const posts = await Post.find({})
      .populate('creator')
      .exec()
    res.status(200).json(posts)
  } catch (err) {
    next(Object.assign({}, err, { status: 400 }))
  }
}

exports.create = async (req, res, next) => {

  try {
    const postObj = Object.assign({}, req.body, {
      background: req.file.filename,
      creator: JSON.parse(req.body.creator),
    })
  
    const newPost = new Post(postObj)
    await newPost.save()
    const posts = await Post.find({})
    res.status(201).json(posts)
  } catch (err) {
    next(Object.assign({}, err, { status: 400 }))
  }
}

exports.postById = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id)
    req.post = post
    next()
  } catch (err) {
    next(Object.assign({}, err, { status: 400 }))
  }
}

exports.update = async (req, res, next) => {
  try {
    const background = (req.file && req.file !== 'undefined') 
      ? req.file.filename 
      : req.post.background
    const postToUpdate = Object.assign(req.post, req.body, { background })
    await postToUpdate.save()

    const posts = await Post.find({})
    res.status(200).json(posts)
  } catch (err) {
    next(Object.assign({}, err, { status: 400 }))
  }
}

exports.read = (req, res) => res.status(200).json(req.post)

exports.remove = async (req, res, next) => {
  try {
    const postToRemove = req.post
    await removeAsset(`posts/${postToRemove.background}`, next)
    await postToRemove.remove()
    const posts = await Post.find({})
    res.status(200).json(posts)
  } catch (err) {
    next(Object.assign({}, err, { status: 400 }))
  }
}

function removeAsset(path, next) {
  fs.unlink(`./public/blog/img/${path}`, err => {
    if (err) return next(newErr(err, '400'))
  }) 
}

