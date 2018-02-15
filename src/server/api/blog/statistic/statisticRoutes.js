/**
 * STATISTIC ROUTES
 */
const router = require('express').Router()

const ctrl = require('./statisticController')

router.route('/').get(ctrl.list)

module.exports = router
