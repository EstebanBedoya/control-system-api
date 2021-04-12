// import mongoose from 'mongoose'
const mongoose = require('mongoose')

const pass = 'estebanrojo09'
// const pass = 'Elcieto21*'
const dbname = 'el-cielo-db'
// const url = `mongodb+srv://admin:${pass}@cluster0.44hll.mongodb.net/${dbname}?retryWrites=true&w=majority` // no personal
const url = `mongodb+srv://admin:${pass}@cluster0.j6cyo.mongodb.net/${dbname}?retryWrites=true&w=majority` // personal
// const url = 'mongodb://localhost:27017/el-cielo-db' // local dev


const connet = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('conectado a la bd pah')
        
    } catch (error) {
        console.log('error de conección: ', error)
    }
}

module.exports = connet
