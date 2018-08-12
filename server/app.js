const Koa = require('koa')
const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

const router = require('./route')
const socketHandler = require('./socket')

server.listen(9000)

app.use(require('koa-static')(__dirname + '/static'))
app.use(router.routes())

socketHandler(io)


