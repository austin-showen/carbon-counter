const router = require('express').Router()
const controller = require('../controllers/trips')
const middleware = require('../middleware')

router.post('/', controller.create)
router.get('/:username', controller.index)
router.delete('/:id', controller.delete)

module.exports = router
