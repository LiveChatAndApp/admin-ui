export function moneyToDollar(money) {
  return money ? money / 100 : 0
}

export function moneyToCent(money) {
  return money ? (money * 100).toFixed(0) : 0
}

// 去除千分位中的‘，'
export const delcommafy = num => {
  if (!num) return num
  num = num.toString()
  num = num.replace(/,/gi, '')
  return num
}

export const addCommas = (numberString) => {
  const parts = numberString.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

function fixWithFloatingDigits(num, digits) {
  const numString = delcommafy(num).toString(10)
  const floatingIndex = numString.indexOf('.')

  // 如果是整數沒有要小數部分
  if (digits === 0) {
    return `${numString}`
  }

  if (floatingIndex < 0) {
    return `${numString}.${new Array(digits).fill('0').join('')}`
  } else {
    const floatingPart = ((numString.length - 1) - floatingIndex > 1)
      ? `${numString.substr(floatingIndex + 1, digits)}`
      : `${numString.substr(floatingIndex + 1, 1)}0`
    return `${numString.substring(0, floatingIndex)}.${floatingPart}`
  }
}

// 获取输入框的值
export const getInputValue = (value, digits = 2) => {
  const inputVal = value || ''
  if (inputVal === undefined || inputVal === null || inputVal === '') {
    return digits === 0 ? '0' : `0.${new Array(digits).fill('0').join('')}`
  }
  return addCommas(fixWithFloatingDigits(inputVal, digits))
}

