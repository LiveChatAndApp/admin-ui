import request from '@/utils/request'

/**
 * @description 日誌列表 (查詢)
 *
 * @param {*} params
 * @returns
 */
export function getLogList(params) {
  return request({
    url: '/auth/page',
    method: 'get',
    params
  })
}

