const test = require("./routes/test") ;
const rooms = require('./routes/rooms') 
const services = require('./routes/historyServices') 
const auth = require("./routes/auth") ;
const products = require('./routes/products') 
const bar = require('./routes/hisotryBar') 
const user = require('./routes/user')
const statistics = require('./routes/statistics')

module.exports = app => {
    app.use(test)

    app.use('/api/auth', auth)
    app.use('/api/users', user)

    app.use('/api/rooms', rooms)
    app.use('/api/bar/products', products)

    // history
    app.use('/api/history/services', services)
    app.use('/api/history/bar', bar)

    app.use('/api/statistics', statistics)
}