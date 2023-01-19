/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
export function isAccount(rule, value, callback) {
  if (!value) {
    return callback(new Error('账号不能空白，请输入账号。'))
  }
  var pattern = /^[a-zA-Z0-9]{3,12}$/
  if (pattern.test(value)) {
    return callback()
  }
  return callback(new Error('输入的账号错误'))
}

/**
 *
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
export function isPassword(rule, value, callback) {
  if (!value) {
    return callback(new Error('密码不能空白，请输入密码。'))
  }
  var pattern = /^[a-zA-Z0-9]{3,12}$/
  if (pattern.test(value)) {
    return callback()
  }
  return callback(new Error('输入的密码错误'))
}

/**
 * 数字检查, 1: 正整数, 2: 小数点以下二位, 3: 小数点以下四位
 * @param str
 * @param type
 * @returns {boolean}
 */
export function checkNum(str, type = 0) {
  if (str === null || str === '') {
    return false
  }

  if (Number(str) < 0) {
    return false
  }

  switch (type) {
    case 1:
      return /^(([1-9]{1}\d*)|(0{1}))$/.test(str)

    case 2:
      return /^(0|(([1-9]{1}\d*)|(0{1}))(()|(\.\d{0,2})))$/.test(str)

    case 3:
      return /^(0|(([1-9]{1}\d*)|(0{1}))(()|(\.\d{0,4})))$/.test(str)
  }

  return true
}
