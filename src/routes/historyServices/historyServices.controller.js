const Service = require('../../models/historyService.model')
const Room = require('../../models/room.model')
const httpCodes = require('../../utils/http-codes')

const getServices = async (req, res) => {
    try {
        const result = await Service.find({ date: { $regex: req.body.date } }).sort('-createdAt')
        res.status(httpCodes.OK).json({
            result,
            message: 'vamo juga'
        })
    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}

const createService = async (req, res) => {
    try {
        const newService = new Service(req.body)

        const result = await newService.save()

        res.status(httpCodes.CREATED).json({
            result,
            message: 'todo melo papi'
        })

    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}

const deleteService = async (req, res) => {
    try {
        const { id } = req.params

        const result = await Service.findOne({ _id: id })
        const delteOne = await Service.deleteOne({ _id: id })
        const update = await Room.updateOne({ id: result.room }, { state: 'disponible' })

        res.status(httpCodes.CREATED).json({
            result,
            message: 'servicio eliminado con exito'
        })
    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}

module.exports = {
    getServices,
    createService,
    deleteService
}