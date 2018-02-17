const dotenv = require('dotenv')

dotenv.config()

const config = {
  dev: 'development',
  test: 'test',
  prod: 'production',
  port: process.env.PORT || 5000,
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.JWT,
  },
  env: '',
}

process.env.NODE_ENV = process.env.NODE_ENV || config.dev
config.env = process.env.NODE_ENV

let envConfig

try {
  if (config.env === 'test') {
    // eslint-disable-next-line
    envConfig = require('./testing')
  } else {
    // eslint-disable-next-line
    envConfig = require(`./${config.env}`)
  }
} catch (e) {
  envConfig = {}
}

module.exports = Object.assign({}, config, envConfig)
