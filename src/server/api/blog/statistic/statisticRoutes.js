// @flow

import { Router } from 'express'

import * as ctrl from './statisticController'

const router = Router()

router.route('/').get(ctrl.list)

export default router
