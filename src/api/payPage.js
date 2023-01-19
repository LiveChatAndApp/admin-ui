import request from '@/utils/request'

export function getPayPageList(params) {
  return request({
    url: '/mgr/pay/page/list',
    method: 'get',
    params
  })
}
