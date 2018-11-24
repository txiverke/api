// @flow

import { Router } from 'express'

import blog from './blog'
import leo from './leo'
import abluelemon from './abluelemon'

const router = Router()

router.use('/blog', blog)
router.use('/leo', leo)
router.use('/abluelemon', abluelemon)

export default router
