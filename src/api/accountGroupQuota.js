import request from '@/utils/request'

export function getAccountGroupQuota(params) {
  return request({
    url: '/mgr/account/group/quota/list',
    method: 'get',
    params
  })
}
