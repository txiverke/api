const express = require('express')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const compression = require('compression')
const cors = require('cors')
const override = require('method-override')
const bodyParser = require('body-parser')
const config = require('../config')

module.exports = app => {
  if (config.env === 'development') {
    app.use(morgan('dev'))
  } else {
    app.use(compression())
  }

  app.use(cors())
  app.use(override())

  app.use(bodyParser.json({ limit: '10mb' }))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

  app.use(express.static('./public'))
  app.use(favicon('./public/favicon.ico'))

}
