import request from '@/utils/request'
const prefix = 'api'
/**
 * @description 資訊
 *
 * @returns
 */
export function getVersion() {
  return request({
    url: `${prefix}/version`,
    method: 'get'
  })
}
