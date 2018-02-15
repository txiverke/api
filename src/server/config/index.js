const dotenv = require('dotenv')

dotenv.config()

const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 8888,
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.JWT || 'txiverke',
  },
  env: '',
}

process.env.NODE_ENV = process.env.NODE_ENV || config.dev
config.env = process.env.NODE_ENV

let envConfig

try {
  // eslint-disable-next-line
  envConfig = require(`./${config.env}`)
} catch (e) {
  envConfig = {}
}

module.exports = Object.assign({}, config, envConfig)
