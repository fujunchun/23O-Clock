/**
 * Created by fujunchun on 2018/8/10.
 */
const Router = require('koa-router')

const router = new Router()

// 获取当前时间
router.get('/api/time', (ctx) => {
  ctx.response.body = {
    time: Date.now()
  }
})

// 获取最新歌曲信息
router.get('/api/music', (ctx) => {
  ctx.response.body = {
    singer: '周传雄',
    name: '黄昏',
    url: 'http://m10.music.126.net/20180810172858/7a1f2f4246e37441f673a9591df994c6/ymusic/47fc/ad40/6374/9c98f806e6611788937ef417b8e92489.mp3',
  }
})

module.exports = router