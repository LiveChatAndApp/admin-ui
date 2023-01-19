import Vue from 'vue'

function addCommas(numberString) {
  const parts = numberString.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

function fixWithFloatingDigits(num, digits) {
  const numString = num.toString(10)
  const floatingIndex = numString.indexOf('.')
  if (floatingIndex < 0) {
    return `${numString}.${new Array(digits).fill('0').join('')}`
  } else {
    const floatingPart = ((numString.length - 1) - floatingIndex > 1)
      ? `${numString.substr(floatingIndex + 1, digits)}`
      : `${numString.substr(floatingIndex + 1, 1)}0`
    return `${numString.substring(0, floatingIndex)}.${floatingPart}`
  }
}

Vue.filter('money', (money) => {
  return money === undefined ? '' : addCommas(fixWithFloatingDigits(money, 2))
})
