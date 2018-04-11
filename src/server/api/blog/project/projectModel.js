// @flow

import mongoose, { Schema } from 'mongoose'

const ProjectSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: String,
  summary: {
    type: String,
    required: true,
  },
  content: String,
  link: String,
  extra: String,
  background: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('Project', ProjectSchema)
