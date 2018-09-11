import mongoose, { Schema } from 'mongoose'

const SchoolSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }, 
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('leo_School', SchoolSchema)