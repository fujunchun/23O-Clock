//app.js
let io = require('./utils/weapp.socket.io.js')
let QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;
App({
  onLaunch: function () {
    let self = this

    // socket连接

    this.globalData.$socket = io('http://192.168.0.105:9000')

    this.globalData.$socket.on('connect', () => {
      console.log('socket连接成功')
    })

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

  globalData: {
    location: null,
    city: null,
    $socket: null
  }
})