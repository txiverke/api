// @flow

const router = require('express').Router()
const ctrl = require('./projectController')

router
  .route('/')
  .get(ctrl.list)
  .post(ctrl.create)

module.exports = router