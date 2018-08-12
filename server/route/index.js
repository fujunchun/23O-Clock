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
    singer: 'Future of Forestry',
    name: 'You',
    url: 'http://m10.music.126.net/20180812165919/01eb33ae812c08f38b311dda816fc433/ymusic/aa68/0649/1ff8/ab32b978c8d3babe8044bc605899b5eb.mp3',
  }
})

module.exports = router