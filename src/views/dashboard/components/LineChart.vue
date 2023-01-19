<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import { debounce } from '@/utils'
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chart: null,
        sidebarElm: null
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.initChart()
      if (this.autoResize) {
        this.__resizeHandler = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHandler)
      }

      // 监听侧边栏的变化
      this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHandler)
      }

      this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

      this.chart.dispose()
      this.chart = null
    },
    methods: {
      sidebarResizeHandler(e) {
        if (e.propertyName === 'width') {
          this.__resizeHandler()
        }
      },
      setOptions({ xAxis, amountArray, amountTitle, countArray, countTitle } = {}) {
        if (!xAxis && !amountArray && !countArray) {
          return
        }

        const amountColor = '#3888fa'
        const countColor = '#00cc99'

        const sortedAmountArray = Array.from(amountArray).sort((a, b) => a < b ? -1 : a > b ? 1 : 0)
        const sortedCountArray = Array.from(countArray).sort((a, b) => a < b ? -1 : a > b ? 1 : 0)

        this.chart.setOption({
          xAxis: {
            data: xAxis,
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              rotate: 45
            },
            axisLine: {
              lineStyle: {
                width: 2
              }
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: [
            {
              name: amountTitle,
              min: Math.floor(sortedAmountArray[0] * 0.9),
              max: Math.ceil(sortedAmountArray[sortedAmountArray.length - 1] * 1.1),
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: amountColor,
                  width: 2
                }
              }
            },
            {
              name: countTitle,
              // 開關右側 y 軸
              // show: false,
              min: Math.floor(sortedCountArray[0] * 0.9),
              max: Math.ceil(sortedCountArray[sortedCountArray.length - 1] * 1.1),
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: countColor,
                  width: 2
                }
              }
            }
          ],
          legend: {
            data: [amountTitle, countTitle]
          },
          series: [
            {
              name: amountTitle,
              itemStyle: {
                normal: {
                  color: amountColor,
                  lineStyle: {
                    color: amountColor,
                    width: 2
                  }
                }
              },
              smooth: true,
              type: 'line',
              yAxisIndex: 0,
              data: amountArray,
              animationDuration: 1000,
              animationEasing: 'cubicInOut'
            },
            {
              name: countTitle,
              itemStyle: {
                normal: {
                  color: countColor,
                  lineStyle: {
                    color: countColor,
                    width: 2
                  },
                  areaStyle: {
                    color: '#f3f8ff'
                  }
                }
              },
              smooth: true,
              type: 'line',
              yAxisIndex: 1,
              data: countArray,
              animationDuration: 1000,
              animationEasing: 'quadraticOut'
            }]
        })
      },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      }
    }
  }
</script>
