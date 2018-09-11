// @flow

import { Router } from 'express'

import blog from './blog'
import leo from './leo'

const router = Router()

router.use('/blog', blog)
router.use('/leo', leo)

export default router
