// @flow

import { Router } from 'express'
import { verifyUser } from './index'
import signin from './controller'

const router = Router()

router.post('/signin', verifyUser(), signin)

export default router
