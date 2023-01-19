import Vue from 'vue'

Vue.filter('percentage', (num) => {
  if (num === undefined || num === null) {
    return ''
  } else if (typeof num === 'number') {
    return num.toFixed(2) + ' %'
  } else if (typeof num === 'string') {
    return num + ' %'
  } else {
    return num
  }
})
