const router = require("express").Router();
const verifyToken = require("../../middlewares").verifyToken;
const isAdmin = require("../../middlewares").isAdmin;
const isModerator = require("../../middlewares").isModerator;

const controller = require("./product.controller");

router.get('/get-all', [verifyToken, isModerator], controller.getProducts)
router.post('/create-product', [verifyToken, isAdmin], controller.crateProduct)
router.put('/update-stock/', [verifyToken, isModerator], controller.updateProductStock)

module.exports = router