const fs = require('fs')

const Post = require('./postModel')

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
    console.log('create',req.body)
    const postObj = Object.assign({}, req.body, {
      background: req.file.filename,
      creator: JSON.parse(req.body.creator),
    })
  
    const newPost = new Post(postObj)
    await newPost.save()
    const posts = await Post.find({}).populate('creator').exec()
    res.status(201).json(posts)
  } catch (err) {
    next(Object.assign({}, err, { status: 400 }))
  }
}

exports.postById = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id).populate('creator').exec()
    req.post = post
    next()
  } catch (err) {
    next(Object.assign({}, err, { status: 400 }))
  }
}

exports.update = (req, res) => {
  Post.findByIdAndUpdate(req.post._id, req.body, (err, post) => {
    if (err) {
      return res.status(400).send()
    }
    Post.findById(post._id).exec((error, updatedPost) => res.status(200).json(updatedPost))
    return false
  })
}

exports.read = (req, res) => res.status(200).json(req.post)

exports.remove = async (req, res) => {
  const postToRemove = req.post

  try {
    await postToRemove.remove()
    const posts = await Post.find({})
      .populate('creator')
      .exec()
    res.status(200).json(posts)
  } catch (err) {
    next(Object.assign({}, err, { status: 400 }))
  }
    /*
    fs.unlink(`./public/img/posts/${post.background}`, error => {
      if (error) throw error
      return res.status(200).json({
        post,
        message: 'Post removed correctly.',
        success: true,
      })
    })

    return false*/
}

exports.filter = (req, res) => {
  const tag = req.params.tag
  Post.find({ tags: tag }, (err, posts) => {
    if (err) {
      return res.status(400).send()
    }
    return res.status(200).json(posts)
  })
}
