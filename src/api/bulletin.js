import request from '@/utils/request'

export function updateBulletinList(data) {
  return request({
    url: '/mgr/bulletin/update',
    method: 'put',
    data: {
      list: data
    }
  })
}

export function getBulletinList(params) {
  return request({
    url: '/mgr/bulletin/list',
    method: 'get',
    params
  })
}
