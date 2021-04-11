const router = require("express").Router();
const verifyToken = require("../../middlewares").verifyToken;
const isAdmin = require("../../middlewares").isAdmin;
const isModerator = require("../../middlewares").isModerator;

const controller = require("./historyServices.controller");

router.post(`/get-all`, [verifyToken, isAdmin], controller.getServices)
router.post(`/create`, [verifyToken, isModerator], controller.createService)
router.delete('/:id', controller.deleteService)

module.exports = router