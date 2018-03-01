// @flow

require('colors')
const mongoose = require('mongoose')

const config = require('./index')
const options = { 
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30 
}

module.exports = () => {
  mongoose.Promise = global.Promise
  const db = mongoose.createConnection(config.db.url, options)

  /* eslint-disable no-console */
  db.on('connected', () => console.log('[  DB connected.  ]'.green))
  db.on('error', err => console.error(err))
  db.on('disconnected', () => console.log('[  DB disconnected.  ]'.red))
  /* eslint-enable no-console */
}
