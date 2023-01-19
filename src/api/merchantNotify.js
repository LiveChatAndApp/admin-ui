import request from '@/utils/request'

export function notifyOrder(params) {
  return request({
    url: `/mgr/order/pay/${params.orderId}/notify`,
    method: 'get'
  })
}

/**
 * @description 代付訂單 通知 api
 *
 * @param {*} params
 * @returns
 */
export function notifyWithdrawOrder(params) {
  return request({
    url: `/mgr/order/withdraw/${params.withdrawOrderId}/notify`,
    method: 'get'
  })
}
