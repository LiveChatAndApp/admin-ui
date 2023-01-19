import request from '@/utils/request'

/**
 * @description 渠道列表 (查詢)
 *
 * @param {*} params
 * @returns
 */
export function getChannelList(params) {
  return request({
    url: '/mgr/channel/list',
    method: 'get',
    params
  })
}

/**
 * @description 渠道列表 (新增)
 *
 * @param {*} data
 * @returns
 */
export function addChannel(data) {
  return request({
    url: '/mgr/channel/add',
    method: 'post',
    data
  })
}

/**
 * @description 渠道列表 (更新)
 *
 * @param {*} data
 * @returns
 */
export function updateChannel(data) {
  return request({
    url: `/mgr/channel/${data.channelId}/update`,
    method: 'put',
    data
  })
}

export function getChannelSettlement() {
  return request({
    url: `/mgr/channel/settlement/list`,
    method: 'get'
  })
}

export function getChannelBaseRate(params) {
  return request({
    url: `/mgr/channel/settlement/${params.channelId}/baseRate/${params.merchantId}/get`,
    method: 'get'
  })
}
