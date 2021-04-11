const mongoose = require('mongoose')

const historyServiceSchema = new mongoose.Schema({
    _id: { type: String},
    date: { type: String, required: true },
    hour: {type: String, required: true},
    room: { type: String, required: true },
    price: { type: Number, required: true },
    detail: { type: String, required: false }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('historyService', historyServiceSchema)