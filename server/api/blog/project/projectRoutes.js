// @flow

const router = require('express').Router()
const ctrl = require('./projectController')
const auth = require('../../../auth')

const checkUser = [auth.decodeToken(), auth.getFreshUser()]

router
  .route('/')
  .get(ctrl.list)
  .post(checkUser, ctrl.create)

router
  .route('/:projectId')
  .get(ctrl.read)

router.param('projectId', ctrl.projectById)

module.exports = router