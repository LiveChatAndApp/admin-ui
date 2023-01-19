import request from '@/utils/request'

export function getFoundToCofferOrderList(params) {
  return request({
    url: '/mgr/foundToCoffer/order/list',
    method: 'get',
    params
  })
}

export function addFoundToCofferOrder(data) {
  return request({
    url: '/mgr/foundToCoffer/order/add',
    method: 'post',
    data
  })
}

export function updateFoundToCofferOrderStatus(data) {
  return request({
    url: `/mgr/foundToCoffer/order/${data.orderId}/status/update`,
    method: 'put',
    data
  })
}
