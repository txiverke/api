// @flow

import { Router } from 'express'
import multer from 'multer'
import crypto from 'crypto'

import * as ctrl from './projectController'
import * as auth from '../../../auth'

// $FlowFixMe: suppressing this error until we can refactor
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
const router = Router()

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

export default router
