import request from '@/utils/request'

/**
 * @description 風控參數 (查詢)
 *
 * @returns
 */
export function getRiskConfigList() {
  return request({
    url: '/mgr/risk/config/list',
    method: 'get'
  })
}

/**
 * @description 風控參數 (編輯)
 *
 * @param {*} data
 * @returns
 */
export function updateRiskConfig(data) {
  return request({
    url: `/mgr/risk/config/${data.key}/update`,
    method: 'put',
    data
  })
}
