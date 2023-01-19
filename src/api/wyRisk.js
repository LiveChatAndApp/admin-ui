import request from '@/utils/request'

export function loginWy(params) {
  return request({
    url: `/mgr/risk/wy/${params.accountId}/login`,
    method: 'get'
  })
}

export function queryWyOrder(params) {
  return request({
    url: `/mgr/risk/wy/${params.accountId}/queryOrder`,
    method: 'get',
    params
  })
}

export function queryWyBalance(params) {
  return request({
    url: `/mgr/risk/wy/${params.accountId}/queryBalance`,
    method: 'get'
  })
}
