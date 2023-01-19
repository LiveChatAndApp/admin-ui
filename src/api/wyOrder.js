import request from '@/utils/request'

export function getWyOrderList(params) {
  return request({
    url: '/mgr/order/wy/list',
    method: 'get',
    params
  })
}
