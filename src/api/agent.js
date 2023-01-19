import request from '@/utils/request'

export function getAgentList(params) {
  return request({
    url: '/mgr/agent/list',
    method: 'get',
    params
  })
}

export function addAgent(data) {
  return request({
    url: '/mgr/agent/add',
    method: 'post',
    data
  })
}

export function updateAgent(data) {
  return request({
    url: `/mgr/agent/${data.merchantId}/update`,
    method: 'put',
    data
  })
}

export function updateAgentStatus(data) {
  return request({
    url: `/mgr/agent/${data.merchantId}/updateStatus`,
    method: 'put',
    data
  })
}
