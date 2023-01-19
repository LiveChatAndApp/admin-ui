import request from '@/utils/request'

export function getMerchantChargeOrderList(params) {
  return request({
    url: '/mgr/merchantCharge/order/list',
    method: 'get',
    params
  })
}

export function addMerchantChargeOrder(data) {
  return request({
    url: '/mgr/merchantCharge/order/add',
    method: 'post',
    data
  })
}

export function updateMerchantChargeOrder(data) {
  return request({
    url: `/mgr/merchantCharge/order/${data.orderId}/status/update`,
    method: 'put',
    data
  })
}
