// import { Schema, model } from 'mongoose'
const mongoose = require('mongoose')

const historyBarSchema = new mongoose.Schema({
    product: { ref: 'Product', type: String, required: true },
    room: { type: String },
    quantity: { type: Number, default: 0 },
    unitValue: Number,
    totalValue: { type: Number },
    date: String
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('historyBar', historyBarSchema)