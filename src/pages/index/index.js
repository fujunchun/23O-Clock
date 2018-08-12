//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    song: null,
    player: null,
    playing: false,
    totalNum: 0,
    cityNum: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getSong()

    // socket
    // 总人数
    app.globalData.$socket.on('total number', (data) => {
      console.log('全国在线：', data)
      this.setData({
        totalNum: data
      })
    })

    // 当前城市人数
    app.globalData.$socket.on('city number', (data) => {
      this.setData({
        cityNum: data
      })
    })
  },

  // 获取歌曲信息
  getSong () {
    let self = this
    wx.request({
      url: 'http://192.168.0.105:9000/api/music',
      method: 'GET',
      success (data) {
        console.log('获取歌曲信息：', data)
        self.data.song = data.data
        self.showSongInfo()
        self.createAudioPlayer()
      }
    })
  },

  showSongInfo () {
    this.setData({
      song: this.data.song
    })
  },

  createAudioPlayer () {
    if (!this.data.player) {
      this.data.player= wx.createInnerAudioContext()
    }
     
    this.data.player.src = this.data.song.url

    this.data.player.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  play () {
    if (this.data.song) {
      this.data.player.play()
      this.data.playing = true
    }
  },

  pause () {
    this.data.player.pause()
    this.data.playing = false
  }
})
