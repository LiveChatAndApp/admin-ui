import Vue from 'vue'
import { addCommas } from '@/utils/money'

Vue.filter('count', count => {
  if (count === null || count === undefined || count === '') {
    return ''
  }
  return addCommas(count)
})
