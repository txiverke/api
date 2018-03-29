// @flow

require('babel-core/register')
require('babel-polyfill')

module.exports = {
  logging: false,
  db: {
    url: process.env.MONGODB_DEV,
  },
}
