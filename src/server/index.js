// @flow

const express = require('express')
const path = require('path')

const app = express()
const api = require('./api')
const error = require('./middleware/errorHandler')
const auth = require('./auth/routes')
const default = require('./default')

require('./config/mongoose')()

require('./middleware')(app)

app.use('/api', api)
app.use('/auth', auth)
app.use('/', default)

app.use(error())

module.exports = app
