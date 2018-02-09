const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  summary: {
    type: String,
    required: true
  },
  content: String,
  link: String,
  background: String,
  tags: Array,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
})

module.exports = mongoose.model('Project', ProjectSchema)