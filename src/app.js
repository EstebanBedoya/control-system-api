const express = require("express");

const setUpExpress = require('./config/express.config')
const setUpRoutes = require('./routes')
const connet = require("./config/mongo.config")

const createRoles = require("./libs/initialSetup").createRoles;

const app = express()
setUpExpress(app)
setUpRoutes(app)
connet()
createRoles
module.exports = app