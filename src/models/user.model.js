const mongoose = require('mongoose')
// import bcrypt from 'bcryptjs'
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String, unique: true },
    role: [{
        ref: 'Role',
        type: mongoose.Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

module.exports = mongoose.model('User', userSchema)