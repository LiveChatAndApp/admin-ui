import request from '@/utils/request'

export function getAccountGroupList(params) {
  return request({
    url: '/mgr/account/group/list',
    method: 'get',
    params
  })
}

export function getAccountGroupAssignableList(params) {
  return request({
    url: '/mgr/account/group/assignable/list',
    method: 'get',
    params
  })
}

export function addAccountGroup(data) {
  return request({
    url: '/mgr/account/group/add',
    method: 'post',
    data
  })
}

export function updateAccountGroup(data) {
  return request({
    url: `/mgr/account/group/${data.accountGroupId}/update`,
    method: 'put',
    data
  })
}
