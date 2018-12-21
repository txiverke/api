import mongoose, { Schema } from 'mongoose'

const currentYear = new Date().getFullYear() + 1

const SchoolSchema = Schema({
  name: {
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
  },
  category: {
    type: Array,
  },
  cp: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    default: currentYear,
  },
})

module.exports = mongoose.model('leo_School', SchoolSchema)
