const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true
  },
  job: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bio: String,
  created: {
    type: Date,
    default: Date.now,
  },
})

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  this.password = this.encryptPassword(this.password);
  next();
})

UserSchema.methods = {
  // check the passwords on signin
  authenticate: function(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password)
  },
  // hash the passwords
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return ''
    } else {
      var salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(plainTextPword, salt)
    }
  }
}

module.exports = mongoose.model('User', UserSchema)
