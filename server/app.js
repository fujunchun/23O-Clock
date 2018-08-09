const Koa = require('koa')
const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

server.listen(9000)
let total = 0

io.on('connection', function(socket){
  total++

  socket.emit('number', total)
});

app.use(require('koa-static')(__dirname + '/static'))


