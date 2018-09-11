// @flow

import { Router } from 'express'
import { verifyUser } from './index'
import signin from './controller'

const router = Router()

router.post('/signin', verifyUser(), signin)
router.post('/signin-leo', verifyUser('leo'), signin)

export default router
