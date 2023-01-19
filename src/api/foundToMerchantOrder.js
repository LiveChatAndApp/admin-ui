import request from '@/utils/request'

export function getFoundToMerchantOrderList(params) {
  return request({
    url: '/mgr/foundToMerchant/order/list',
    method: 'get',
    params
  })
}

export function addFoundToMerchantOrder(data) {
  return request({
    url: '/mgr/foundToMerchant/order/add',
    method: 'post',
    data
  })
}

export function updateFoundToMerchantOrderStatus(data) {
  return request({
    url: `/mgr/foundToMerchant/order/${data.orderId}/status/update`,
    method: 'put',
    data
  })
}

export function updateFoundToMerchantOrderFee(data) {
  return request({
    url: `/mgr/foundToMerchant/order/updateFee`,
    method: 'post',
    data
  })
}
