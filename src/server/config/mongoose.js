// @flow

require('colors')
const mongoose = require('mongoose')

const config = require('./index')

module.exports = () => {
  mongoose.Promise = global.Promise
  mongoose.connect(config.db.url)

  const db = mongoose.connection

  /* eslint-disable no-console */
  db.on('connected', () => console.log('[  DB connected.  ]'.green))
  db.on('error', err => console.error(err))
  db.on('disconnected', () => console.log('[  DB disconnected.  ]'.red))
  /* eslint-enable no-console */
}
