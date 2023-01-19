import { getToken } from '@/utils/auth'
import * as moment from 'moment'
import { getHeaders } from '@/utils/request'
import axios from 'axios'
const baseURL = process.env.BASE_API.indexOf('http') !== -1 ? process.env.BASE_API : window.location.pathname + process.env.BASE_API

export const downloadRequest = axios.create({
  baseURL,
  timeout: 180 * 1000
})

downloadRequest.interceptors.request.use(config => {
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

downloadRequest.interceptors.response.use(
  response => {
    const fileName = decodeURI(response.headers['content-disposition'].split(';')[1].replace('filename=', ''))
    if (response.data) {
      // 要加上\ufeff 修正編碼問題
      const temp = window.URL.createObjectURL(new Blob(['\ufeff', response.data]))
      const link = document.createElement('a')
      link.href = temp
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
)

export default function download(url, params) {
  const fullUrl = `${process.env.BASE_API}${url}`

  let query = ''
  if (params) {
    query = '?' + Object.keys(params)
      .map(key => {
        const value = params[key]
        if (value === undefined || value == null) {
          return undefined
        } else if (value instanceof Date) {
          const str = moment(value).format('YYYY-MM-DDTHH:mm:ss') + '.000Z'
          return key + '=' + str
        } else {
          return key + '=' + params[key]
        }
      })
      .filter(text => text !== undefined)
      .join('&')
  }

  query += `${query ? '&' : ''}Authorization=Bearer ${getToken()}`

  window.open(fullUrl + query)
}
