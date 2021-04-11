const router = require("express").Router();
const verifyToken = require("../../middlewares").verifyToken;
const isAdmin = require("../../middlewares").isAdmin;
const isModerator = require("../../middlewares").isModerator;

const controller = require("./historyBar.controller");

router.post('/get-all', [verifyToken, isAdmin], controller.getHistoryBar)
router.post('/create', [verifyToken, isModerator], controller.create)
router.delete('/:id', controller.deletehistory)

module.exports = router;