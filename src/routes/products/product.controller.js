const Product = require('../../models/product.model')
const httpCodes = require('../../utils/http-codes')

const getProducts = async (_, res) => {
    try {
        const result = await Product.find().sort('name')

        res.status(httpCodes.OK).json({
            result,
            message: 'todo melo papi'
        })
    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}

const crateProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body)

        const result = await newProduct.save()

        res.status(httpCodes.CREATED).json({
            result,
            message: 'todo melo papi'
        })
    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}

const updateProductStock = async (req, res) => {
    try {
        const { _id, stock } = req.query
        await Product.updateOne({ _id: _id }, { stock: stock })

        res.status(httpCodes.UPDATED).json({
            result: await Product.find(),
            message: 'todo melo papi'
        })

    } catch (error) {
        res.status(httpCodes.SERVER_ERROR).send({ message: error.message })
    }
}

module.exports = {
    getProducts,
    crateProduct,
    updateProductStock
}