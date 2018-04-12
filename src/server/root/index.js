// @flow

import { Router } from 'express'

const router = Router()

// $FlowFixMe
router.use('/*', (req, res) => {
  res.status(404).send('This is a private API')
})

export default router
