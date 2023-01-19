import request from '@/utils/request'

export function getAccountAllocationList(params) {
  return request({
    url: '/mgr/account/allocation/list',
    method: 'get',
    params
  })
}

export function updateAccountAllocation(data) {
  return request({
    url: `/mgr/account/allocation/${data.merchantId}/update`,
    method: 'put',
    data
  })
}
