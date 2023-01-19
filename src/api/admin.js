import request from '@/utils/request'

/**
 * @description 管理者 - 帳號列表
 *
 * @param {*}
 * @returns
 */
export function getadminlist(data) {
  return request({
    url: '/admin/page',
    method: 'get',
    params: data
  })
}

/**
 * @description 管理者 - 帳號列表
 *
 * @param {*} email	电子信箱
 * @param {*} nickname	昵称
 * @param {*} password	密码
 * @param {*} phone	手机
 * @param {*} remark	备注
 * @returns
 */
export function addAdminUser(data) {
  return request({
    url: '/admin/insert',
    method: 'post',
    data
  })
}

/**
 * @description 管理者 - 帳號列表
 *
 * @param {*}
 * @returns
 */
export function updateAdminUser(data) {
  return request({
    url: '/admin/update',
    method: 'post',
    data
  })
}

export function getAdminInfo() {
  return request({
    url: '/admin/info',
    method: 'GET'
  })
}
