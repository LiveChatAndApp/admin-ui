import request from '@/utils/request'

export function getBannedIpList(params) {
  return request({
    url: '/mgr/bannedIp/list',
    method: 'get',
    params
  })
}

export function addBannedIpList(data) {
  return request({
    url: '/mgr/bannedIp/add',
    method: 'post',
    data
  })
}

export function updateBannedIpList(data) {
  return request({
    url: `/mgr/bannedIp/${data.id}/update`,
    method: 'put',
    data
  })
}
