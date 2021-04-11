// export { verifyToken, isAdmin, isModerator } from "./auth.jwt";

const isAdmin = require('./auth.jwt').isAdmin
const verifyToken = require('./auth.jwt').verifyToken
const isModerator = require('./auth.jwt').isModerator

module.exports = {
    isAdmin,
    verifyToken,
    isModerator
}
