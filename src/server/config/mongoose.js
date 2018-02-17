// @flow

require('colors')
const mongoose = require('mongoose')

const config = require('./index')

module.exports = () => {
  mongoose.Promise = global.Promise
  const db = mongoose.connect(config.db.url)

  /* eslint-disable no-console */
  db.connection.on('connected', () => console.log('[  DB connected.  ]'.green))
  db.connection.on('error', err => console.error(err))
  db.connection.on('disconnected', () => console.log('[  DB disconnected.  ]'.red))
  /* eslint-enable no-console */
}
