const jwt = require("jsonwebtoken");
const config = require('../config')

const User = require('../models/user.model')
const Role = require('../models/role.model')

const httpCodes = require('../utils/http-codes')

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']

        // !token && res.status(403).json({ message: "no token provided" })
        if (!token) res.status(403).json({ message: "no token provided" })

        const decodet = jwt.verify(token, config.SECRET)
        req.userId = decodet.id

        const user = await User.findById(req.userId, { password: 0 })
        if (!user) res.status(httpCodes.NOT_FOUND).json({ message: 'no user found' })

        next()
    } catch (error) {
        console.log(error)
        return res.status(httpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
    }
}

const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.role } })
    if (roles.filter(role => role.name === 'moderator').length > 0) {
        next()
        return
    }

    return res.status(403).json({ message: 'Require moderator role' })
}

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId)

    const roles = await Role.find({ _id: { $in: user.role } })

    if (roles.filter(role => role.name === 'admin').length > 0) {
        next()
        return
    }

    return res.status(403).json({ message: 'Require admin role' })
}

module.exports = {
    verifyToken,
    isModerator,
    isAdmin
}