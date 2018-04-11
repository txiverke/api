// @flow

import { Router } from 'express'

import users from './user/userRoutes'
import posts from './post/postRoutes'
import statistic from './statistic/statisticRoutes'
import projects from './project/projectRoutes'

const router = Router()

router.use('/users', users)
router.use('/posts', posts)
router.use('/statistic', statistic)
router.use('/projects', projects)

export default router
