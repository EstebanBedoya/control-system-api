const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    price: Number,
    stock: Number
})

module.exports = mongoose.model('Product', productSchema)