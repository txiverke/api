// @flow

import express from 'express'

import api from './api'
import error from './middleware/errorHandler'
import auth from './auth/routes'
import root from './root'
import mongoose from './config/mongoose'
import middleware from './middleware'

const app = express()
mongoose()
middleware(app)

app.use('/api', api)
app.use('/auth', auth)
app.use('/', root)

app.use(error())

export default app
