const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  background: {
    type: String,
  },
  link: {
    type: String,
    required: true
  },
  tags: String,
})

module.exports = mongoose.model('Post', PostSchema)
