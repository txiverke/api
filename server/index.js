// @flow

const express = require('express')

const app = express()
const api = require('./api')
const error = require('./middleware/errorHandler')
const logger = require('./util/logger')
const auth = require('./auth/routes');


require('./config/mongoose')()

require('./middleware')(app)

app.use('/api', api)
app.use('/auth', auth)

app.use((err, req, res, next) => {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(500).send('Oops');
});

app.use(error())

module.exports = app
