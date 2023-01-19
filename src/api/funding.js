import request from '@/utils/request'

/**
 * @description 角色列表 acl by roleId
 *
 * @param {*} roleId
 * @returns
 */
export function getFundinoutList(data) {
  return request({
    url: '/fundinout/page',
    method: 'get',
    params: data
  })
}

export function verifyWithdrawal(data) {
  return request({
    url: '/fundinout/verify/withdrawal',
    method: 'post',
    data
  })
}
