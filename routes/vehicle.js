const router = require('express').Router()
const controller = require('../controllers/vehicle')
const middleware = require('../middleware')

router.post('/', controller.create)
router.get('/', controller.index)

module.exports = router