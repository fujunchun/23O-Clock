const Koa = require('koa')
const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

const router = require('./route')

server.listen(9000)

app.use(require('koa-static')(__dirname + '/static'))
app.use(router.routes())


let total = 0

io.on('connection', function(socket){
  total++
  console.log('新用户', total)
  socket.emit('number', total)
});



