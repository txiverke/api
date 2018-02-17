// @flow

const router = require('express').Router()

router.use('/*', (req, res) => {
  res.status(404).send('This is a private API')
})

module.exports = router
