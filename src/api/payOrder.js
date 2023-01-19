import request from '@/utils/request'
import download from '@/utils/download'

/**
 * @description 收款訂單 (查詢)
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getPayOrderList(params) {
  return request({
    url: '/mgr/order/pay/list',
    method: 'get',
    params
  })
}

/**
 * @description 收款訂單 導出csv
 *
 * @param {*} params
 */
export function exportPayOrderList(params) {
  download('/mgr/order/pay/list/csv', params)
}

/**
 * @description 收款訂單 刷新
 *
 * @param {*} params
 * @returns
 */
export function pullPayOrder(params) {
  const result = request({
    url: `/mgr/order/pay/${params.payOrderId}/${params.payOrderStatus}/pull`,
    method: 'get'
  })
  return result
}
