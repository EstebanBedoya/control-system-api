const app = require('./app')
const createServer = require('http').createServer

const port = process.env.PORT || 3001
const http = createServer(app)

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    // console.log('a user connected');

    socket.on('rooms client', () => {
        io.emit('rooms server')
    })

    socket.on('products client', () => {
        io.emit('products server')
    })

    socket.on('history services client', () => {
        io.emit('history services server')
    })

    socket.on('history products client', () => {
        io.emit('history products server')
    })

    socket.on('test', (data) => {
        console.log(data)
        io.emit('test server', (data))
    })

    socket.on('puto', () => {
        io.emit('hi', 'everyone');
    })

});

http.listen(port, () => console.log('estamos al aire pa'))