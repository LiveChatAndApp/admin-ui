import request from '@/utils/request'
import sha256 from 'crypto-js/sha256'
const prefix = '/admin'

/**
 * @description 用戶列表 (踢出用戶)
 *
 * @param username
 * @param merchantId
 * @returns
 */
export function kickUser(username, merchantId) {
  return request({
    url: '/user/kick',
    method: 'post',
    data: {
      username,
      merchantId
    }
  })
}

/**
 * @description 后台用户-列表
 *
 * @export
 * @params createTimeGt 起
 * @params createTimeLe 迄
 * @params needSort
 * @params page 頁碼
 * @params rows 每頁筆數
 * @params type 帳單類型
 * @params status 狀態
 * @params userName 用户账号
 * @params id 用户UID
 * @return {*}
 */
export function getUserPageList(params) {
  return request({
    url: `${prefix}/user/page`,
    method: 'get',
    params
  })
}

/**
 * @description 后台用户 (踢出用戶)
 *
 * @param username
 * @param merchantId
 * @returns
 */
export function kickOutUser(id) {
  return request({
    url: `${prefix}/user/kickOut`,
    method: 'post',
    data: { id }
  })
}

/**
 * @description 后台用户 (更新)
 *
 * @param email
 * @param id
 * @param nickname
 * @param phone
 * @param remark
 * @param status
 * @returns
 */
export function updateUser(data) {
  return request({
    url: `${prefix}/user/update`,
    method: 'post',
    data
  })
}

/**
 * @description 后台用户(重置密碼)
 *
 * @param {*} data
 * @returns
 */
export function resetUserPassword(data) {
  const { id, password } = data
  return request({
    url: `${prefix}/user/resetPwd`,
    method: 'post',
    data: {
      id,
      password: sha256(password).toString()
    }
  })
}

/**
 * @description 后台用户 (新增)
 *
 * @param {*} data
 * @returns
 */
export function addUser(data) {
  return request({
    url: `${prefix}/user/insert`,
    method: 'post',
    data: {
      ...data,
      password: sha256(data.password).toString()
    }
  })
}

/**
 * @description 账号资讯
 *
 * @returns
 */
export function getUserProfile() {
  return request({
    url: `${prefix}/user/info`,
    method: 'get'
  })
}
