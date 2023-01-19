import request from '@/utils/request'
const prefix = '/admin'

/**
 * @description 默认好友-群列表
 * @param data
 * @returns
 */
export function getDefaultMemberList(params) {
  return request({
    url: `${prefix}/defaultMember/page`,
    method: 'get',
    params
  })
}

/**
 * @description 新增默认好友-群
 * @param data
 * @returns
 */
export function addDefaultMember(data) {
  return request({
    url: `${prefix}/defaultMember/add`,
    method: 'post',
    data
  })
}

/**
 * @description 全局预设好友-群状态
 * @param data
 * @returns
 */
export function setDefaultMemberType(data) {
  return request({
    url: `${prefix}/defaultMember/type`,
    method: 'post',
    data
  })
}

/**
 * @description 编辑好友-群
 * @param data
 * @returns
 */
export function editDefaultMember(data) {
  return request({
    url: `${prefix}/defaultMember/edit`,
    method: 'post',
    data
  })
}

/**
 * @description 编辑好友-群
 * @param data
 * @returns
 */
export function deleteDefaultMember(id) {
  return request({
    url: `${prefix}/defaultMember/delete/${id}`,
    method: 'post'
  })
}
