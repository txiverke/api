/**
 * USER ROUTES
 */

const router = require('express').Router()
const ctrl = require('./userController')
const auth = require('../../../auth')

const checkUser = [auth.decodeToken(), auth.getFreshUser()]

router
  .route('/')
  .get(checkUser, ctrl.list)
  .post(checkUser, ctrl.create)

router
  .route('/:id')
  .get(ctrl.read)
  .put(checkUser, ctrl.update)
  .delete(checkUser, ctrl.delete)

router.param('id', ctrl.userById)

module.exports = router
