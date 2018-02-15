const mongoose = require('mongoose')

const config = require('./index')
const logger = require('../util/logger')

module.exports = () => {
  mongoose.Promise = global.Promise
  const db = mongoose.connect(config.db.url)

  /* eslint-disable no-console */
  db.connection.on('connected', () => logger.log('DB connected.'))
  db.connection.on('error', err => logger.error(err))
  db.connection.on('disconnected', () => logger.log('DB disconnected.'))
  /* eslint-enable no-console */
}
