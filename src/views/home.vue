<template lang="pug">
  .home
    canvas#myCanvas(:width="width" :height="height")
    .text
      span 存活细胞:&ensp;
      span {{lifes}}
    .sub
      van-radio-group(v-model="check")
        van-radio(name="大爆炸") 大爆炸
        van-radio(name="小蝌蚪") 小蝌蚪
        van-radio(name="小泥鳅") 小泥鳅
        van-radio(name="大螃蟹") 大螃蟹
        van-radio(name="小海星") 小海星
        .space
        van-radio(name="小龙虾") 小龙虾
        van-radio(name="小乌贼") 小乌贼
      //- van-button(@click="startGame") 重新开始
      .btn
        van-button(@click="reset") 清空
      .rule(@click="showRule = true") 游戏规则
    van-popup.rule-wrap(v-model="showRule")
      span &emsp;&emsp;生命游戏（Game of Life），即元胞自动机，是一种离散的状态机，有无数个独立的格子，每个格子处于某种状态，然后所有格子按照预先设定好的规律进行状态演化。格子们可以是任意维度、任意形状、按任意规律排布的。而生命游戏就是最简单的元胞自动机之一——在二维平面上的方格子（细胞），每个细胞有两种状态：死或活，而下一回合的状态完全受它周围8个细胞的状态而定。按照以下三条规则进行演化：<br>
      span 1. 活细胞周围的细胞数如果小于2个或多于3个则会死亡；（离群或过度竞争导致死亡）<br>
      span 2. 活细胞周围如果有2或3个细胞可以继续存活；（正常生存）<br>
      span 3. 死细胞（空格）周围如果恰好有3个细胞则会诞生新的活细胞。（繁殖）<br>
      span 这三条规则简称B3/S23。如果调整规则对应的细胞数量，还能衍生出其他类型的自动机。<br><br>
      span 游戏操作：选择指定的生物类型，点击屏幕即可生成指定生命种子，观察生命演化状态。
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
      height: 0,
      timer: '',
      check: '小蝌蚪',
      showRule: false
    }
  },
  methods: {
    setGame () {
      this.width = document.documentElement.clientWidth
      this.height = document.documentElement.clientHeight - 140
      this.color = { r: 251, g: 53, b: 80, a: 255 }
      this.canvas = document.getElementById("myCanvas")
      this.ctx = this.canvas.getContext("2d")
      this.imgData = this.ctx.createImageData(this.width, this.height)
      // 监测鼠标左键点击事件
      this.canvas.addEventListener("mousedown", (e) => {
        let x, y
        let sw = (this.canvas.style.width.replace(/\px/g, "")) | 0
        let sh = (this.canvas.style.height.replace(/\px/g, "")) | 0
        if (e.pageX || e.pageY) {
          x = e.pageX
          y = e.pageY
        } else {
          x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
          y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }
        x -= this.canvas.offsetLeft
        y -= this.canvas.offsetTop
        if (sw) x *= this.canvas.width / sw
        if (sh) y *= this.canvas.height / sh
        x |= 0
        y |= 0
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.x = x
        this.y = y
        // this.setAlive(this.imgData, (this.y * this.width + this.x) * 4, this.color)
        // this.ctx.putImageData(this.imgData, 0, 0)
        this.addBaby(x, y)
      }, false)
    },
    addBaby (x, y) {
      if (this.check === '大爆炸') {
        this.bomb(x, y)
      } else if (this.check === '小蝌蚪') {
        this.tad(x, y)
      } else if (this.check === '小泥鳅') {
        this.loach(x, y)
      } else if (this.check === '大螃蟹') {
        this.crab(x, y)
      } else if (this.check === '小海星') {
        this.cross(x, y)
      } else if (this.check === '小龙虾') {
        this.crayfish(x, y)
      } else if (this.check === '小乌贼') {
        this.uzi(x, y)
      }
      // 赋值
      this.ctx.putImageData(this.imgData, 0, 0)
    },
    startGame () {
      if (this.timer) {
        return
      }
      // 开始炸裂
      this.timer = setInterval(() => {
        this.ctx.putImageData(this.imgData, 0, 0)
        this.setRule(this.imgData, this.width, this.height)
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
      // 绘制活细胞图形颜色
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
    setRule (imgData, width, height) {
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
            // 周围有三个活细胞则存活
            this.setAlive(buf, (y * width + x) * 4, this.color)
          } else if (cnt === 2) {
            // 周围有两个活细胞则保持之前状态
            buf.data[ (y * width + x) * 4 ] = this.imgData.data[ (y * width + x) * 4 ]
            buf.data[ (y * width + x) * 4 + 1 ] = this.imgData.data[ (y * width + x) * 4 + 1 ]
            buf.data[ (y * width + x) * 4 + 2 ] = this.imgData.data[ (y * width + x) * 4 + 2 ]
            buf.data[ (y * width + x) * 4 + 3 ] = this.imgData.data[ (y * width + x) * 4 + 3 ]
          } else {
            // 其余情况死亡
            this.setDeath(buf, (y * width + x) * 4, this.color)
          }
          if (this.isAlive(buf, (y * width + x) * 4)) {
            ++this.lifes
          }
        }
      }
      // 赋值
      for (let y = 0; y < imgData.data.length; ++y) {
        imgData.data[y] = buf.data[y]
      }
    },
    bomb () {
      // 宇宙大爆炸
      for (let y = 0 ; y < this.height ; ++y ) {
        for (let x = 0 ; x < this.width ; x += 30) {
          this.setAlive(this.imgData, (y * this.width + (x) ) * 4, this.color)
        }
      }
    },
    tad (x, y) {
      // 小蝌蚪
      this.setAlive(this.imgData, ((y - 1) * this.width + (x) ) * 4, this.color)
      this.setAlive(this.imgData, (y * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 1) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 1) * this.width + (x) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 1) * this.width + (x + 1) ) * 4, this.color)
    },
    loach (x, y) {
      // 小泥鳅
      this.setAlive(this.imgData, ((y - 1) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 1) * this.width + (x - 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 1) * this.width + (x - 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 1) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x + 2) ) * 4, this.color)
    },
    crab (x, y) {
      // 大螃蟹
      this.setAlive(this.imgData, ((y - 3) * this.width + (x - 7) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x - 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x - 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x - 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x - 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x - 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x - 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x - 7) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 7) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 6) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 5) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 1) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 1) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 5) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 6) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 7) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 5) * this.width + (x - 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x - 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 1) * this.width + (x - 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 1) * this.width + (x - 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x - 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 5) * this.width + (x - 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 5) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 1) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 1) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 5) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 7) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 6) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 5) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 1) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 1) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 5) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 6) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 7) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x + 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x + 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x + 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x + 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x + 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x + 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x + 7) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x + 7) ) * 4, this.color)
    },
    cross (x, y) {
      // 小海星
      this.setAlive(this.imgData, ((y) * this.width + (x) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 1) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 4) * this.width + (x + 4) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 5) * this.width + (x + 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 6) * this.width + (x + 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 7) * this.width + (x + 7) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 8) * this.width + (x + 8) ) * 4, this.color)

      this.setAlive(this.imgData, ((y + 1) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x - 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 4) * this.width + (x - 4) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 5) * this.width + (x - 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 6) * this.width + (x - 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 7) * this.width + (x - 7) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 8) * this.width + (x - 8) ) * 4, this.color)

      this.setAlive(this.imgData, ((y - 1) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 4) * this.width + (x + 4) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 5) * this.width + (x + 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 6) * this.width + (x + 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 7) * this.width + (x + 7) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 8) * this.width + (x + 8) ) * 4, this.color)

      this.setAlive(this.imgData, ((y - 1) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x - 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 4) * this.width + (x - 4) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 5) * this.width + (x - 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 6) * this.width + (x - 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 7) * this.width + (x - 7) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 8) * this.width + (x - 8) ) * 4, this.color)
    },
    crayfish (x, y) {
      // 小龙虾
      this.setAlive(this.imgData, ((y - 5) * this.width + (x - 7) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 7) * this.width + (x - 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 6) * this.width + (x - 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 4) * this.width + (x - 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x - 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 5) * this.width + (x - 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x - 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y) * this.width + (x - 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y) * this.width + (x - 4) ) * 4, this.color)
      this.setAlive(this.imgData, ((y) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y) * this.width + (x - 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x - 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 1) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 1) * this.width + (x) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 1) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 1) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y) * this.width + (x + 4) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x + 4) ) * 4, this.color)
      this.setAlive(this.imgData, ((y) * this.width + (x + 5) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 5) * this.width + (x + 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x + 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y) * this.width + (x + 6) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 7) * this.width + (x + 7) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 6) * this.width + (x + 7) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 4) * this.width + (x + 7) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x + 7) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 5) * this.width + (x + 8) ) * 4, this.color)
    },
    uzi (x, y) {
      // 小乌贼
      this.setAlive(this.imgData, ((y - 1) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x - 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 4) * this.width + (x - 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x - 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 4) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 1) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 4) * this.width + (x - 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 4) * this.width + (x) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 6) * this.width + (x) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 7) * this.width + (x) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 3) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 2) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 4) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 6) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 7) * this.width + (x + 1) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 4) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 1) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 4) * this.width + (x + 2) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 4) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 3) * this.width + (x + 3) ) * 4, this.color)
      this.setAlive(this.imgData, ((y - 1) * this.width + (x + 4) ) * 4, this.color)
      this.setAlive(this.imgData, ((y) * this.width + (x + 4) ) * 4, this.color)
      this.setAlive(this.imgData, ((y + 2) * this.width + (x + 4) ) * 4, this.color)
    }
  },
  mounted () {
    this.setGame()
    this.startGame()
  }
};
</script>

<style scoped lang="stylus">
.home {
  background #000
  .text {
    position fixed
    bottom .28rem
    right 0
    display flex
    padding-bottom .1rem
    font-size .1rem
    color #fff
    span {
      &:first-child {
        display flex
        align-items center
        justify-content flex-end
      }
      &:last-child {
        display flex
        align-items center
        justify-content flex-start
        min-width .45rem
      }
    }
  }
  .sub {
    position fixed
    bottom .15rem
    left 0
    width 100%
    display flex
    align-items flex-end
    .van-radio-group /deep/ {
      position relative
      display flex
      flex-direction column
      flex-wrap wrap
      justify-content flex-start
      height 1rem
      margin-bottom -.1rem
      padding-left .1rem
      z-index 9
      .space {
        height .2rem
      }
      .van-radio {
        padding-bottom .1rem
        &:nth-child(4), &:nth-child(5), &:nth-child(6), &:nth-child(7),&:nth-child(8) {
          padding-left .1rem
        }
      }
      .van-radio__label {
        color #fff
      }
    }
    .btn {
      position relative
      display flex
      align-items flex-end
      justify-content flex-start
      height fit-content
      padding-left .4rem
      z-index 10
      .van-button {
        width .6rem
        height .25rem
        line-height .25rem
      }
    }
    .rule {
      flex 1
      display flex
      align-items flex-end
      justify-content flex-end
      padding-right .35rem
      font-size .12rem
      color #fff
      text-decoration underline
    }
  }
  .rule-wrap {
    width 80%
    padding .1rem
    border-radius 5px
    text-align left
    span {
      font-size .12rem
    }
  }
}
</style>
