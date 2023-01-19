import request from '@/utils/request'
import qs from	'qs'
import download from '@/utils/download'

/**
 * @description 商戶帳變日誌 (查詢)
 *
 * @param {*} params
 * @returns
 */
export function getMerchantBalanceLogList(params) {
  return request({
    url: '/mgr/merchant/balance/log/list',
    method: 'get',
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
    params
  })
}

/**
 * @description 商戶漲便日誌 導出 cvs
 *
 * @export
 * @param {*} params
 */
export function exportMerchantBalanceLogList(params) {
  download('/mgr/merchant/balance/log/list/csv', params)
}
