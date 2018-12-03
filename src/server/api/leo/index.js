// @flow

import { Router } from 'express'

import users from './user/userRoutes'
import schools from './school/schoolRoutes'
import images from './image/imageRoutes'
import documents from './document/documentRoutes'

const router = Router()

router.use('/users', users)
router.use('/schools', schools)
router.use('/images', images)
router.use('/documents', documents)

export default router
