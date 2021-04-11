const Room = require('../../models/room.model')
const httpCodes = require('../../utils/http-codes')

const getRooms = async (_, res) => {
    try {
        const result = await Room.find().sort('id')

        res.status(httpCodes.OK).json({
            result,
            message: 'vamo juga'
        })
    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}

const createRoom = async (req, res) => {
    try {
        const newRoom = new Room(req.body)

        const result = await newRoom.save()

        res.status(httpCodes.CREATED).json({
            result,
            message: 'todo melo papi'
        })

    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}

const updateStateRoom = async (req, res) => {
    try {
        const { id, hour, typeService, newState } = req.body
        const room = await Room.findOne({ id: id })
        // const state = !room.available ? true : false

        const temporary = {
            typeService: newState === 'disponible' ? '' : typeService,
            checkinTime: newState === 'disponible' ? '' : hour
        }

        await Room.updateOne({ id: id }, {
            state: newState,
            temporary
        }, { runValidators: true })

        res.status(httpCodes.UPDATED).json({
            result: await Room.find(),
            room_updated: room.id,
            newState
        })

    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}

const allAvailableRoom = async (_, res) => {
    try {
        const roomsNoAvailable = await Room.updateMany({ state: {$ne: 'disponible'} }, { state: 'disponible' })
        res.status(httpCodes.UPDATED).json({
            roomsNoAvailable
        })
    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}


module.exports = {
    getRooms,
    createRoom,
    updateStateRoom,
    allAvailableRoom
}
