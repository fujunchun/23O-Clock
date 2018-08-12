// pages/hello/hello.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: 'Hello',
    defaultMsg: 'Hello',
    goodMorning: 'Good morning',
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good evening',
    goodNight: 'Good night'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.route)
    setTimeout(() => {
      // 请求服务器时间
      wx.request({
        url: 'http://192.168.0.105:9000/api/time',
        method: 'GET',
        success: data => {
          console.log('服务器时间：', data)
          let date = new Date(data.data.time)

          this.changeView(date)
        }
      })
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // 根据请求回来的时间，显示不同的内容
  changeView: function (date) {
    let hour = date.getHours()
    let msg = ''

    console.log('hour', hour)

    hour = 23

    switch (true) {
      // 晚安
      case hour >= 1 && hour < 7:
        msg = this.data.goodNight
        break
      // 上午好
      case hour >= 7 && hour < 12:
        msg = this.data.goodMorning
        break
      // 下午好
      case hour >= 12 && hour < 19:
        msg = this.data.goodAfternoon
        break
      // 晚上好
      case hour >= 19 && hour < 23:
        msg = this.data.goodNight
        break
    }

    if (msg) {
      this.setData({
        msg
      })
    } else {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    }
  }
})