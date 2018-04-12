// @flow

import { Router } from 'express'

const router = Router()

router.use('/*', (req, res) => {
  res.status(404).send('This is a private API')
})

export default router
