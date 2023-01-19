import request from '@/utils/request'

/**
 * @description 商戶列表 （查詢）
 *
 * @param {*} params
 * @returns
 */
export function getMerchantList(params) {
  return request({
    url: '/mgr/merchant/list',
    method: 'get',
    params
  })
}

/**
 * @description 商戶列表 (新增)
 *
 * @param {*} data
 * @returns
 */
export function addMerchant(data) {
  return request({
    url: '/mgr/merchant/add',
    method: 'post',
    data
  })
}

/**
 * @description 商戶列表 (更新)
 *
 * @param {*} data
 * @returns
 */
export function updateMerchant(data) {
  return request({
    url: `/mgr/merchant/${data.merchantId}/update`,
    method: 'put',
    data
  })
}

/**
 * @description 商戶列表 (更新狀態)
 *
 * @param {*} data
 * @returns
 */
export function updateMerchantStatus(data) {
  return request({
    url: `/mgr/merchant/${data.merchantId}/updateStatus`,
    method: 'put',
    data
  })
}

export function getChildAgentList() {
  return request({
    url: `/mgr/merchant/getAgent`,
    method: 'get'
  })
}

export function generateRequestKey() {
  return request({
    url: `/mgr/merchant/requestKey/generate`,
    method: 'get'
  })
}

/**
 * @description 商戶列表 (更新是否後台可登狀態)
 *
 * @param {*} data: {merchantId, isBackendLogin}
 * @returns
 */
export function updateBackendLoginStatus(data) {
  return request({
    url: `/mgr/merchant/${data.merchantId}/updateBackendLogin`,
    method: 'put',
    data
  })
}
