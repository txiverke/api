// @flow

import { Router } from 'express'

import users from './user/userRoutes'
import schools from './school/schoolRoutes'
import images from './image/imageRoutes'

const router = Router()

router.use('/users', users)
router.use('/schools', schools)
router.use('/images', images)

export default router