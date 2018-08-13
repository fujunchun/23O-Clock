/**
 * Created by fujunchun on 2018/8/10.
 */
let schedule = require('node-schedule')

module.exports = (io) => {
    let total = 0

    // 新用户连接
    io.on('connection', (socket) => {
        total++
        console.log('新用户', total)
        // 广播所有，当前连接数
        broadcastTotalNum()

        // 断开连接前
        socket.on('disconnecting', () => {
            total--
            broadcastTotalNum()
            console.log( Object.keys(socket.rooms))
            broadcastCityNum(socket.rooms)
        })

        /**
         * 加入某个城市room
         * {
         *    cityCode: '1111'
         * }
         */
        socket.on('join room', (data) => {
            let { cityCode } = data
            socket.join(cityCode, () => {
                broadcastCityNum(socket.rooms)
            })
        })
    })

    // 广播当前总人数
    function broadcastTotalNum () {
        io.emit('total number', total)
    }

    // 对某个房间/某个城市的人广播数量
    function broadcastCityNum (socketRooms) {
        let rooms = Object.keys(socketRooms)
        rooms.pop()

        if (rooms.length > 0) {
            rooms.forEach((room) => {
                let num = io.of('/').adapter.rooms[room].length
                io.to(room).emit('city number', num)
            })
        }
    }
    
    // 定时任务，当23：00和 01：00时，广播时间，进行应用的开启和关闭
    let start = schedule.scheduleJob('0 0 23 * * *', () => {
        console.log('开启任务拉')
        io.emit('current time', {
            time: Date.now()
        })
    })

    let end = schedule.scheduleJob('0 0 1 * * *', () => {
        console.log('关闭任务拉')
        io.emit('current time', {
            time: Date.now()
        })
    })
}