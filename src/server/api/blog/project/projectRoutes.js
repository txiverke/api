/**
 * PROJECT ROUTES
 */

const router = require('express').Router()
const multer = require('multer')
const crypto = require('crypto')

const ctrl = require('./projectController')
const auth = require('../../../auth')

const checkUser = [auth.decodeToken(), auth.getFreshUser()]

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/blog/img/projects/')
  },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      const mimetype = file.originalname.substr(file.originalname.lastIndexOf('.') + 1)
      cb(null, `${raw.toString('hex')}${Date.now()}.${mimetype}`)
    })
  },
})

const upload = multer({ storage })

router
  .route('/')
  .get(ctrl.list)
  .post(checkUser, upload.single('file'), ctrl.create)

router
  .route('/:projectId')
  .get(ctrl.read)
  .put(checkUser, upload.single('file'), ctrl.update)
  .delete(checkUser, ctrl.remove)

router.param('projectId', ctrl.projectById)

module.exports = router