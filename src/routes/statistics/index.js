const router = require("express").Router();
const verifyToken = require("../../middlewares").verifyToken;
const isAdmin = require("../../middlewares").isAdmin;

const controller = require("./statistics.controller");

router.post('/get-totalities',[verifyToken, isAdmin], controller.getTotalities)
router.post('/services_provided_by_room',[verifyToken, isAdmin], controller.servicesProvidedByRooms)

module.exports = router