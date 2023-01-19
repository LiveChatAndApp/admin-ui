import request from '@/utils/request'

/**
 * @description 白名單 (查詢)
 *
 * @param {*} params
 * @returns
 */
export function getBlackWhiteList(params) {
  return request({
    url: '/mgr/blackwhitelist/list',
    method: 'get',
    params
  })
}

/**
 * @description 白名單 (新增)
 *
 * @export
 * @param {*} params ex: { "hostIp": "11111111", "status": "1", "type": "B" }
 * @returns
 */
export function addBlackWhite(data) {
  return request({
    url: '/mgr/blackwhitelist/add',
    method: 'post',
    data
  })
}

/**
 * @description 白名單 (修改)
 *
 * @param {*} data ex: { "id": "1", "hostIp": "222222", "status": "1", "type": "B" }
 * @returns
 */
export function updateBlackWhite(data) {
  return request({
    url: `/mgr/blackwhitelist/update`,
    method: 'post',
    data
  })
}

/**
 * @description 白名單 (刪除)
 *
 * @param {*} data { id, merchantId, hostIp, type } 必傳
 * @returns
 */
export function deleteBlackWhite(data) {
  return request({
    url: `/mgr/blackwhitelist/delete`,
    method: 'post',
    data
  })
}

/**
 * @description 白名單 (設定 redis)
 *
 * @param {*} data
 * @returns
 */
export function setBlackWhiteRedis(data) {
  return request({
    url: `/mgr/blackwhitelist/setRedis`,
    method: 'post',
    data
  })
}
