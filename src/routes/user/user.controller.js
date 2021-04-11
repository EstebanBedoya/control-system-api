const User = require("../../models/user.model");
const Role = require("../../models/role.model");
const config = require('../../config')
const httpCodes = require('../../utils/http-codes')

const getAll = async (_, res) => {
    try {
        const result = await User.find()

        res.status(httpCodes.OK).json({
            result,
            message: 'vamo juga'
        })
    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}

const deleteOne = async (req, res) => {
    try {
        const { username } = req.params
        await User.deleteOne({username: username})
        res.status(httpCodes.OK).json({
            message: 'eliminado pah'
        })
    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}


module.exports = {
    getAll,
    deleteOne
}