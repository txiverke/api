const router = require('express').Router()

const blog = require('./blog')

router.use('/blog', blog)

module.exports = router
