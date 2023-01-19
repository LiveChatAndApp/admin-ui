import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getAuthHeaderKey, getAuthHeaderValue, getToken } from '@/utils/auth'
import * as moment from 'moment'
import { logout } from '@/api/login'
import i18n from '@/lang'
import { showSuccess } from '@/utils/executionMessage'

const baseURL = process.env.BASE_API.indexOf('http') !== -1 ? process.env.BASE_API : window.location.pathname + process.env.BASE_API

// console.log('====================================')
// console.log('window.location.pathname: ', window.location.pathname)
// console.log('process.env.BASE_API: ', process.env.BASE_API)
// console.log('baseURL: ', baseURL)
// console.log('====================================')

const request = axios.create({
  baseURL,
  timeout: 180 * 1000
})

export function getHeaders(isMultipart) {
  const headers = {}
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json;charset=UTF-8'
  }
  if (getToken()) {
    headers[getAuthHeaderKey()] = getAuthHeaderValue()
  }
  return headers
}

request.interceptors.request.use(config => {
  // Before request is sent
  let query = ''
  if (config.params) {
    query = '?' + Object.keys(config.params).map(key => {
      const value = config.params[key]
      if (value instanceof Date) {
        const str = moment(value).format('YYYY-MM-DD HH:mm:ss')
        return key + '=' + str
      } else {
        return key + '=' + config.params[key]
      }
    }).join('&')
  }
  console.log(`Request ${config.method.toUpperCase()} ${config.url}${query}`, config, config.data || null)
  config.headers = getHeaders()
  return config
}, error => {
  // When request error
  console.log('Request Error', error)
  Promise.reject(error)
})

request.interceptors.response.use(
  response => {
    const res = response.data
    const method = response.config.method.toUpperCase()
    console.log(`Response ${method} ${response.config.url}`, response)
    if (res.code === 401) {
      doLogout(res.code)
    } else if (res.code === 200) {
      if (method !== 'GET') {
        showSuccess()
      }
      return res.data
    } else {
      Message({
        // message: `${res.message} (錯誤碼: ${res.code})`,
        message: `${res.message}`,
        type: 'error',
        duration: 5 * 1000
      })
      throw res
    }
  },
  error => {
    if (!error.response) {
      doLogout()
    } else if (error.response.status === 401) {
      console.log(error.response.data.message)
      doLogout()
    } else {
      const msg = error.response.data ? error.response.data.message : error.message
      Message({
        message: msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  })

function doLogout(code) {
  MessageBox.confirm(
    i18n.t('logout.message'),
    i18n.t('logout.title'),
    {
      confirmButtonText: i18n.t('logout.confirm'),
      cancelButtonText: i18n.t('logout.cancel'),
      type: 'error'
    })
    .then(() => {
      if (code === '0001') {
        // 0001 是 session/get?token 有問題，就不需要再執行 logout
        location.reload()
      } else {
        logout().then(() => {
          location.reload()
        })
      }
    })
}

export default request
