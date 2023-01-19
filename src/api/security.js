import request from '@/utils/request'

/**
 * @description ip 管理 (查詢)
 *
 * @param {*} params
 * @returns
 */
export function getSecurityList(params) {
  return request({
    url: '/mgr/security/list',
    method: 'get',
    params
  })
}

/**
 * @description ip 管理 (新增)
 *
 * @param {*} data
 * @returns
 */
export function addSecurity(data) {
  return request({
    url: '/mgr/security/add',
    method: 'post',
    data
  })
}

/**
 * @description ip 管理 (更新)
 *
 * @param {*} data
 * @returns
 */
export function updateSecurity(data) {
  return request({
    url: `/mgr/security/${data.securityId}/update`,
    method: 'put',
    data
  })
}
