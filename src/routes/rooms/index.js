const router = require("express").Router();
const verifyToken = require("../../middlewares").verifyToken;
// const isAdmin = require("../../middlewares").isAdmin;
const isModerator = require("../../middlewares").isModerator;

const controller = require("./room.controller");

router.get(`/get-all`, [verifyToken, isModerator], controller.getRooms)
router.post('/', controller.createRoom)
router.put(`/update-state`, [verifyToken, isModerator], controller.updateStateRoom)
router.put('/allAvailable', controller.allAvailableRoom)

module.exports = router