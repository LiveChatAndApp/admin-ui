import request from '@/utils/request'

export function getBankCardOrderList(params) {
  return request({
    url: '/mgr/order/bankcard/list',
    method: 'get',
    params
  })
}
