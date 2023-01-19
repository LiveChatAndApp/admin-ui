<template>
  <ul class="list" :style="stylesWrap" @mouseenter="mouseEnter()" @mouseleave="mouseLeave()">
    <li v-for="(item, index) in marqueeList" :key="index" class="row" :style="stylesItem" ref="li" v-html="item"></li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        current: -1,
        // ul样式
        stylesWrap: {
          width: this.width,
          height: this.height
        },
        // li样式
        stylesItem: {
          height: this.height,
          lineHeight: this.height,
          color: this.color,
          fontSize: this.fontSize
        },
        scrollHeight: 0,
        showing: false,
        paused: false
      }
    },
    props: {
      // 宽度
      width: {
        type: String,
        default: '100px'
      },
      // 高度
      height: {
        type: String,
        default: '40px'
      },
      // 字体颜色
      color: {
        type: String,
        default: '#6699ff'
      },
      // 字体大小
      fontSize: {
        type: String,
        default: '16px'
      },
      // 下拉速度
      showSpeed: {
        type: Number,
        validator(val) {
          return /^\d+$/.test(val)
        },
        default: 15
      },
      // 切换间隔时间(ms)
      pauseTime: {
        type: Number,
        validator(val) {
          return /^\d+$/.test(val)
        },
        default: 5000
      },
      // 滚动速度
      scrollSpeed: {
        type: Number,
        validator(val) {
          return /^\d+$/.test(val)
        },
        default: 22
      },
      // 悬停时暂停
      pauseOnHover: {
        type: Boolean,
        default: false
      },
      // 内容
      marqueeList: {
        type: Array,
        default: function() {
          return []
        }
      }
    },
    mounted() {
      if (this.marqueeList.length > 0) {
        this.init()
      }
    },
    methods: {
      init() {
        this.mqLength = this.marqueeList.length
        this.scrollHeight = this.height.replace(/[^0-9]/gi, '')
        this.$nextTick(() => {
          this.showNext()
        })
      },
      mouseEnter() {
        if (!this.pauseOnHover === true) return false

        this.pause()
      },
      mouseLeave() {
        if (!this.pauseOnHover === true) return false

        this.resume()
      },
      pause() {
        this.paused = true

        if (this.showing !== true) {
          const li = this.$refs.li[this.current]
          clearInterval(li.timer)
        }
      },
      resume() {
        this.paused = false

        if (this.showing !== true) {
          const li = this.$refs.li[this.current]
          this.scroll(li, 1)
        }
      },
      showNext() {
        this.current++

        if (this.current >= this.mqLength) {
          this.current = 0
        }

        this.show(this.current)
      },
      show(i) {
        for (const item of this.$refs.li) {
          if (hasClass(item, 'active')) {
            return false
          }
        }

        const li = this.$refs.li[i]

        // 调整至可见区域顶部
        li.style.left = '0px'
        li.style.top = -this.scrollHeight + 'px'

        addClass(li, 'active')

        this.showing = true
        // 下移至可见区域
        animate(li, { top: 12 }, this.showSpeed, 0.01, () => {
          this.showing = false
          this.scroll(li)
        })
      },
      scroll(li, delay) {
        if (this.paused === true) return false

        if (li.scrollWidth > li.clientWidth) {
          // 左移
          setTimeout(() => {
            if (this.paused === true) return false

            animate(li, { left: -li.scrollWidth }, this.scrollSpeed, 1, () => {
              this.finish(li)
            })
          }, delay || 1000)
        } else {
          setTimeout(() => {
            // 下移动至底部不可见区域
            if (this.paused === true) return false

            animate(li, { top: this.scrollHeight }, this.showSpeed, 0.01)
            this.finish(li)
          }, delay || this.pauseTime)
        }
      },
      finish(li) {
        removeClass(li, 'active')

        this.showNext()
      }
    },
    beforeDestroy() {
      this.pause()

      this.current = -1
    },
    watch: {
      marqueeList(val) {
        if (val.length > 0) {
          this.init()
        }
      }
    }
  }

  function animate(obj, json, interval, sp, fn) {
    clearInterval(obj.timer)
    obj.timer = setInterval(() => {
      var flag = true
      for (var arr in json) {
        var icur = 0
        if (arr === 'opacity') {
          icur = Math.round(parseFloat(getStyle(obj, arr)) * 100)
        } else {
          icur = parseInt(getStyle(obj, arr))
        }
        var speed
        if (sp === 1) {
          // 匀速
          speed = 0
          if (json[arr] < 0) {
            speed--
          } else {
            speed++
          }
        } else {
          // 缓冲效果
          speed = (json[arr] - icur) * sp
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
        }

        if (icur !== json[arr]) {
          flag = false
        }
        if (arr === 'opacity') {
          obj.style.filter = 'alpha(opacity : ' + (icur + speed) + ')'
          obj.style.opacity = (icur + speed) / 100
        } else {
          obj.style[arr] = icur + speed + 'px'
        }
      }

      if (flag) {
        clearInterval(obj.timer)
        if (fn) {
          fn()
        }
      }
    }, interval)
  }

  // 获取样式
  function getStyle(obj, name) {
    if (obj.currentStyle) {
      return obj.currentStyle[name]
    } else {
      return getComputedStyle(obj, false)[name]
    }
  }

  function hasClass(ele, cls) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    return ele.className.match(reg)
  }

  function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
      const reg = new RegExp('/(^s*)|(s*$)/g')
      const className = ele.className.replace(reg, '')
      ele.className = className + ' ' + cls
    }
  }

  function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
      const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
      ele.className = ele.className.replace(reg, ' ')
    }
  }
</script>

<style scoped>
  .list {
    overflow: hidden;
    position: relative;
    width: 100%;
    display: inline-block;
  }

  .row {
    text-align: right;
    font-weight: bold;
    display: block;
    white-space: nowrap;
    width: 100%;
    position: absolute;
    top: -999em;
    left: 0;
  }
</style>
