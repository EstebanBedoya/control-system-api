const router = require("express").Router();
const controller = require('./user.controller')

router.get('/get-all', controller.getAll)
router.delete('/delete-one/:username', controller.deleteOne)

module.exports = router