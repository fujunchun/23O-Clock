//app.js
let io = require('./utils/weapp.socket.io.js')
let EventEmitter = require('./utils/EventEmitter.js')
let QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;
App({
  onLaunch: function () {
    let self = this

    this.globalData.eventEmitter = new EventEmitter()
    // socket连接
    this.globalData.$socket = io('http://192.168.0.105:9000')
    this.socketEvent()

    // 位置相关
    qqmapsdk = new QQMapWX({
      key: 'N62BZ-DXDYP-5TWD4-VVEDN-HME2Q-KNFU7'
    });
    // 获取位置
    wx.getLocation({
      success (res) {
        console.log('获取位置：', res)
        self.globalData.location = res
        self.reverseGeocoder(res)
      }
    })
  },

  joinRoom (city) {
    this.globalData.$socket.emit('join room', {
      cityCode: city.code
    })
  },

  reverseGeocoder (location) {
    let self = this
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      success: function (res) {
        console.log('真实地址：', res);
        self.globalData.city = {
          name: res.result.ad_info.city,
          code: res.result.ad_info.city_code
        }

        self.joinRoom(self.globalData.city)
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },

  socketEvent () {
    let socket = this.globalData.$socket
    let eventEmitter = this.globalData.eventEmitter

    // 连接成功
    socket.on('connect', () => {
      console.log('socket连接成功')
    })

    // 总人数
    socket.on('total number', (data) => {
      console.log('总人数：', data)
      this.globalData.totalNum = data
      eventEmitter.emit('total number', data)
    })

    // 当前城市人数
    socket.on('city number', (data) => {
      console.log('城市人数：', data)
      this.globalData.cityNum = data
      eventEmitter.emit('city number', data)
    })

    // 服务器到点，主动下发时间
    // 当前城市人数
    socket.on('current time', (data) => {
      console.log('服务器到点下发时间：', data)
      eventEmitter.emit('current time', data)
    })

  },

  globalData: {
    location: null,
    city: null,
    $socket: null,
    eventEmitter: null,
    totalNum: 0,
    cityNum: 0
  }
})