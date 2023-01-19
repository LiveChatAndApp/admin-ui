import request from '@/utils/request'

export function getBankCardList(query) {
  return request({
    url: '/mgr/bankCard/list',
    method: 'get',
    params: query
  })
}

export function addBankCard(data) {
  return request({
    url: '/mgr/bankCard/add',
    method: 'post',
    data
  })
}

export function updateBankCard(data) {
  return request({
    url: `/mgr/bankCard/${data.accountId}/update`,
    method: 'put',
    data
  })
}
