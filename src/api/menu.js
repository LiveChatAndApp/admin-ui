import request from '@/utils/request'

export function getmenuTree(data) {
  return request({
    url: '/menu/page',
    method: 'get',
    params: data
  })
}

export function getmenuList(data) {
  return request({
    url: '/menu/list',
    method: 'get',
    params: data
  })
}
/**
 * @description 支付渠道列表 （新增）
 * @deprecated 已由 addNewAccount 替換，如有使用到需要做替換方法
 * @param {*} data
 * @returns
 */
export function addMenu(data) {
  return request({
    url: '/menu/insert',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: '/menu/update',
    method: 'post',
    data
  })
}
