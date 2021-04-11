const mongoose = require('mongoose')

const TypeService = new mongoose.Schema({
    littleWhile: Number,
    dawn: Number,

}, { _id: false })

const PriceSchema = new mongoose.Schema({
    week: TypeService,
    weekend: TypeService,
    decoration: Number,
    reservation: Number
}, { _id: false })

const roomSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: String,
        required: true,
        default: 'disponible',
        enum: ['disponible', 'ocupado', 'reservado', 'mantenimiento', 'alistamiento']
    },
    prices: PriceSchema,
    thematic: {
        type: String,
        required: true
    },
    category: String,
    temporary: {
        typeService: { type: String, default: '', enum: ['', 'dawn', 'littleWhile'] },
        checkinTime: { type: String, default: '' }
    }
}, { versionKey: false, _id: false })

module.exports = mongoose.model('Room', roomSchema)