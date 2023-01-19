import request from '@/utils/request'

export function getMerchantUserList(params) {
  return request({
    url: '/mgr/merchant/user/list',
    method: 'get',
    params
  })
}

export function updateMerchantUser(data) {
  return request({
    url: `/mgr/merchant/user/${data.id}/update`,
    method: 'put',
    data
  })
}

export function getMerchantUserReport(params) {
  return request({
    url: `/mgr/merchant/user/${params.id}/report`,
    method: 'get',
    params
  })
}
