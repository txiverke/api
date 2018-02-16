// @flow

const express = require('express')
const path = require('path')

const app = express()
const api = require('./api')
const error = require('./middleware/errorHandler')
const logger = require('./util/logger')
const auth = require('./auth/routes')

require('./config/mongoose')()

require('./middleware')(app)

app.use('/api', api)
app.use('/auth', auth)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use((err, req, res) => {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token')
    return
  }

  logger.error(err.stack)
  res.status(500).send('Oops')
})

app.use(error())

module.exports = app
