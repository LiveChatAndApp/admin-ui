import request from '@/utils/request'

export function getOrderTraceList(params) {
  return request({
    url: '/mgr/order/trace/list',
    method: 'get',
    params
  })
}

/**
 * @description 日誌
 *
 * @param {*} params: type(0=支付, 1=代付), orderId
 * @returns
 */
export function getOrderTraceLog(params) {
  return request({
    url: `/mgr/order/trace/log/${params.type}/${params.orderId}`,
    method: 'get'
  })
}
