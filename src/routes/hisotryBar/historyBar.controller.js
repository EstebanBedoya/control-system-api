const Bar = require("../../models/historyBar.model");
const Product = require("../../models/product.model");
const Room = require("../../models/room.model");
const httpCodes = require("../../utils/http-codes");
const { ObjectId } = require('mongodb');

const date = new Date()

const getHistoryBar = async (req, res) => {
    try {
        const result = await Bar.find({ date: { $regex: req.body.date } }).sort('-createdAt')

        res.status(httpCodes.OK).json({
            result,
            message: 'todo melo papi'
        })
    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}

const create = async (req, res, next) => {
    try {
        const { product, room, quantity, date } = req.body
        let result
        let message

        const newBar = new Bar({
            product,
            quantity,
            date //: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        })

        const findProduct = await Product.findOne({ name: product })
        const findRoom = await Room.findOne({ id: room })

        newBar.product = findProduct.name
        newBar.unitValue = findProduct.price
        newBar.totalValue = newBar.quantity * newBar.unitValue

        newBar.room = room ? findRoom.id : "none"

        // valida si que el stock del producto sea mayor a la cantidad solicitada
        if (findProduct.stock >= quantity && quantity > 0) {
            // const newQuantity = findProduct.stock - quantity
            // await Product.updateOne({ _id: findProduct._id }, { stock: newQuantity })
            result = await newBar.save()
            message = 'todo melo papi'
        } else {
            message = 'no stock disponible'
            next()
        }

        res.status(httpCodes.CREATED).json({
            result,
            message
        })

    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}

const deletehistory = async (req, res) => {
    try {
        const { id } = req.params

        const result = await Bar.findById(id)

        const newStockQuery = await Bar.aggregate([
            {
                '$match': {
                    '_id': new ObjectId(id)
                }
            }, {
                '$lookup': {
                    'from': 'products',
                    'localField': 'product',
                    'foreignField': 'name',
                    'as': 'products'
                }
            }, {
                '$unwind': {
                    'path': '$products'
                }
            }, {
                '$project': {
                    '_id': 0,
                    'newStock': {
                        '$sum': [
                            '$quantity', '$products.stock'
                        ]
                    }
                }
            }
        ])

        const {newStock} = newStockQuery[0]

        const updateProductStock = await Product.updateOne({ name: result.product }, {stock: newStock})

        const deleteHistory = await Bar.deleteOne({_id: new ObjectId(id)})

        res.status(httpCodes.CREATED).json({
            result,
            updateProductStock,
            deleteHistory,
            message: 'servicio eliminado con exito'
        })
    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}

module.exports = {
    getHistoryBar,
    create,
    deletehistory
}