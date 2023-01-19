import request from '@/utils/request'
import { getToken, removeToken } from '@/utils/auth'
import sha256 from 'crypto-js/sha256'

export function loginByUsername(data) {
  const { username, password, checkcode, totpCode } = data
  const param = {
    username,
    password: sha256(password).toString(),
    checkcode
  }
  // 有存在
  if (totpCode) {
    param.totpCode = totpCode
  }

  return request({
    url: '/login',
    method: 'post',
    data: param
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  }).then(removeToken)
}

export function getSession() {
  return request({
    url: '/session/get',
    method: 'get',
    params: {
      token: getToken()
    }
  })
}
