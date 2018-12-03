import mongoose, { Schema } from 'mongoose'

const DocumentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  projects: [
    {
      title: {
        type: String,
        required: true,
      },
      items: [
        {
          title: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],

  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('leo_Document', DocumentSchema)
