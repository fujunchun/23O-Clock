//app.js
let QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;
App({
  onLaunch: function () {
    let self = this

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
    city: null
  }
})