// @flow

const router = require('express').Router()

const users = require('./user/userRoutes')
const posts = require('./post/postRoutes')
const statistic = require('./statistic/statisticRoutes')
const projects = require('./project/projectRoutes')

router.use('/users', users)
router.use('/posts', posts)
router.use('/statistic', statistic)
router.use('/projects', projects)

module.exports = router
