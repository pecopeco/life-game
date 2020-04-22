<template lang="pug">
  .home
    canvas#myCanvas(:width="width" :height="height")
    .text
      span 存活细胞:&ensp;
      span {{lifes}}
    .btn
      van-button(@click="startGame") 开始
      van-button(@click="reset") 清空
</template>

<script>
export default {
  components: {},
  data () {
    return {
      lifes: 0,
      x: 0,
      y: 0,
      color: '',
      imgData: '',
      canvas: '',
      ctx: '',
      width: 0,
      height: 0
    }
  },
  methods: {
    setGame () {
      this.width = document.documentElement.clientWidth
      this.height = document.documentElement.clientHeight
      this.color = { r: 255, g: 255, b: 255, a: 255 }
      this.canvas = document.getElementById("myCanvas")
      this.ctx = this.canvas.getContext("2d")
      this.imgData = this.ctx.createImageData(this.width, this.height)
      // this.canvas.addEventListener("mousedown", (e) => {
      //   let x, y
      //   let sw = (this.canvas.style.width.replace(/\px/g, "")) | 0
      //   let sh = (this.canvas.style.height.replace(/\px/g, "")) | 0
      //   if (e.pageX || e.pageY) {
      //     x = e.pageX
      //     y = e.pageY
      //   } else {
      //     x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
      //     y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
      //   }
      //   x -= this.canvas.offsetLeft
      //   y -= this.canvas.offsetTop
      //   if (sw) x *= this.canvas.width / sw
      //   if (sh) y *= this.canvas.height / sh
      //   x |= 0
      //   y |= 0
      //   this.ctx.clearRect(0, 0, this.width, this.height)
      //   this.x = x
      //   this.y = y
      //   this.setAlive(this.imgData, (this.y * this.width + this.x) * 4, this.color)
      //   this.ctx.putImageData(this.imgData, 0, 0)
      // }, false)
    },
    startGame () {
      for (let j = 0 ; j < this.height ; ++j ) {
        for (let i = 0 ; i < this.width ; i += 30) {
          this.setAlive(this.imgData, (j * this.width + (i) ) * 4, this.color)
        }
      }
      // 开始炸裂
      setInterval(() => {
        this.ctx.putImageData(this.imgData, 0, 0)
        this.bomb(this.imgData, this.width, this.height)
      }, 1000 / 20)
    },
    reset () {
      for (let y = 0; y < this.height; ++y) {
        for (let x = 0; x < this.width; ++x) {
          this.setDeath(this.imgData, (y * this.width + x) * 4, this.color)
        }
      }
    },
    setAlive (imgData, pos, color) {
      // 绘制活细胞图形为白色
      imgData.data[pos] = color.r
      imgData.data[pos + 1] = color.g
      imgData.data[pos + 2] = color.b
      imgData.data[pos + 3] = color.a
    },
    setDeath (imgData, pos) {
      // 绘制死细胞图形为黑色
      imgData.data[pos] = 0
      imgData.data[pos + 1] = 0
      imgData.data[pos + 2] = 0
      imgData.data[pos + 3] = 0
    },
    isAlive (imgData, pos) {
      // 像素点不是黑色则为存活状态
      return imgData.data[pos] != 0
    },
    bomb (imgData, width, height) {
      this.lifes = 0
      let cnt = 0
      let buf = this.ctx.createImageData(width, height)
      for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
          cnt = 0
          // 当前点下方细胞存活
          if (y != 0 && this.isAlive(imgData, ((y - 1) * width + x) * 4)) {
            cnt++
          }
          // 当前点上方细胞存活
          if (y != height - 1 && this.isAlive(imgData, ((y + 1) * width + x) * 4)) {
            cnt++
          }
          // 当前点左方细胞存活
          if (x != 0 && this.isAlive(imgData, (y * width + x - 1) * 4)) {
            cnt++
          }
          // 当前点右方细胞存活
          if (x != width - 1 && this.isAlive(imgData, (y * width + x + 1) * 4)) {
            cnt++
          }
          // 当前点左下方细胞存活
          if (
            x != 0 &&
            y != 0 &&
            this.isAlive(imgData, ((y - 1) * width + x - 1) * 4)
          ) {
            cnt++
          }
          // 当前点左上方细胞存活
          if (
            x != 0 &&
            y != height - 1 &&
            this.isAlive(imgData, ((y + 1) * width + x - 1) * 4)
          ) {
            cnt++
          }
          // 当前点右上方细胞存活
          if (
            x != width - 1 &&
            y != height - 1 &&
            this.isAlive(imgData, ((y + 1) * width + x + 1) * 4)
          ) {
            cnt++
          }
          // 当前点右下方细胞存活
          if (
            x != width - 1 &&
            y != 0 &&
            this.isAlive(imgData, ((y - 1) * width + x + 1) * 4)
          ) {
            cnt++
          }
          if (cnt === 3) {
            this.setAlive(buf, (y * width + x) * 4, this.color)
          } else if (cnt !== 2) {
            this.setDeath(buf, (y * width + x) * 4, this.color)
          } else {
            buf.data[ (y * width + x) * 4 ] = this.imgData.data[ (y * width + x) * 4 ]
            buf.data[ (y * width + x) * 4 + 1 ] = this.imgData.data[ (y * width + x) * 4 + 1 ]
            buf.data[ (y * width + x) * 4 + 2 ] = this.imgData.data[ (y * width + x) * 4 + 2 ]
            buf.data[ (y * width + x) * 4 + 3 ] = this.imgData.data[ (y * width + x) * 4 + 3 ]
          }
          if (this.isAlive(buf, (y * width + x) * 4)) {
            ++this.lifes
          }
          // if (cnt === 2 || cnt === 3) {
          //   // 周围有三个细胞则存活
          //   this.setAlive(buf, (y * width + x) * 4, this.color)
          // } else if (cnt < 2 || cnt > 3) {
          //   // 周围有两个以下或三个以上的细胞则死亡
          //   this.setDeath(buf, (y * width + x) * 4, this.color)
          // }
          // if (this.isAlive(buf, (y * width + x) * 4)) {
          //   ++this.lifes
          // }
        }
      }
      // 赋值
      for (let y = 0; y < imgData.data.length; ++y) {
        imgData.data[y] = buf.data[y]
      }
    }
  },
  mounted () {
    this.setGame()
  }
};
</script>

<style scoped lang="stylus">
.home {
  background #000
  .text {
    position fixed
    bottom .4rem
    right 0
    min-width 1rem
    display flex
    padding-bottom .1rem
    font-size .1rem
    color #fff
    span {
      flex 1
      &:first-child {
        display flex
        align-items center
        justify-content flex-end
      }
      &:last-child {
        display flex
        align-items flex-end
        justify-content flex-start
      }
    }
  }
  .btn {
    position fixed
    bottom .1rem
    left 0
    width 100%
    text-align center
    .van-button {
      width .6rem
      height .25rem
      line-height .25rem
      &:first-child {
        margin-right .2rem
      }
    }
  }
}
</style>
