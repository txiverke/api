// @flow

const express = require('express')
const path = require('path')

const app = express()
const api = require('./api')
const error = require('./middleware/errorHandler')
const auth = require('./auth/routes')

require('./config/mongoose')()

require('./middleware')(app)

app.use('/api', api)
app.use('/auth', auth)
app.use(error())

module.exports = app
