const router = require("express").Router();

const controller = require('./auth.controller')

router.post('/sing-up', controller.singUp)
router.post('/login', controller.singIn)

module.exports = router