import { Router } from 'express'
import * as ctrl from './userControler'

const router = Router()

router
  .route('/')
  .get(ctrl.list)
  .post(ctrl.create)

router
  .route('/:userId')
  .get(ctrl.read)
  .put(ctrl.update)

router.param('userId', ctrl.userById)
  
export default router