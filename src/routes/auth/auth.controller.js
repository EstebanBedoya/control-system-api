const User = require("../../models/user.model");
const Role = require("../../models/role.model");
const jwt = require("jsonwebtoken");
const config = require('../../config')
const httpCodes = require('../../utils/http-codes')

const singUp = async (req, res) => {
    const { username, password, role } = req.body

    const newUser = new User({
        username,
        password: await User.encryptPassword(password)
    })

    if (role) {
        const foundRoles = await Role.find({ name: { $in: role } })
        newUser.role = foundRoles.map(role => role._id)
    } else {
        const role = await Role.find({ name: "moderator" })
        newUser.role = [role._id]
    }

    const savedUser = await newUser.save()

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: config.EXPIRE_TOKEN // 24 hours
    })

    res.status(httpCodes.CREATED).json({ token })
}

const singIn = async (req, res) => {

    const userFound = await User.findOne({ username: req.body.username }).populate('role')

    !userFound && res.status(httpCodes.UNAUTHORIZED).json({ message: "User not found" })

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    !matchPassword && res.status(httpCodes.UNAUTHORIZED).json({ message: "invalid password" })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: config.EXPIRE_TOKEN
    })

    const roles = userFound.role.map(item => item.name)

    res.status(httpCodes.OK).json({ token, roles })
}

module.exports = {
    singIn,
    singUp
}