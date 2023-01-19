import request from '@/utils/request'

const prefix = '/admin'

/**
 * @description 群列表
 *
 * @param {*} params
 * @param cid 聊天室ID
 * @param id id
 * @param name 聊天室名称
 * @param status 状态
 * @param needSort false,示例值(false)
 * @param page 页码数
 * @param rows 每页记录数
 * @param sort 排序方式(_create_time,DESC、_update_time,DESC) 预设(_create_time,DESC),示例值(_create_time,DESC)
 * @returns
 */
export function getChatroomList(params) {
  return request({
    url: `${prefix}/chatroom/page`,
    method: 'get',
    params
  })
}

/**
 * @description 解散聊天室
 * @param name 聊天室名称
 * @param imageFile 头像
 */
export function addChatroom(formData) {
  return request({
    url: `${prefix}/chatroom/create`,
    method: 'post',
    data: formData
  })
}

/**
 * @description 解散聊天室
 *
 * @param {*} params
 * @param cid 聊天室ID
 * @param id id
 */
export function destroyChatroom({ cid, id }) {
  return request({
    url: `${prefix}/chatroom/destroy`,
    method: 'post',
    data: { cid, id }
  })
}

/**
 * @description 群列表
 *
 * @param {*} params
 * @param cid 聊天室ID
 * @param id id
 * @param nickNameOrMemberName 用戶昵称
 * @param needSort false,示例值(false)
 * @param page 页码数
 * @param rows 每页记录数
 * @param sort 排序方式(_create_time,DESC、_update_time,DESC) 预设(_create_time,DESC),示例值(_create_time,DESC)
 * @returns
 */
export function getChatroomOnlineMemberList(params) {
  return request({
    url: `${prefix}/chatroom/onlineMember`,
    method: 'get',
    params
  })
}

/**
 * @description 解散聊天室
 *
 * @param {*} params
 * @param cid 聊天室ID
 * @param id id
 * @param sort 順序
 */
export function updateChatroomSort({ cid, id, sort }) {
  return request({
    url: `${prefix}/chatroom/updateSort`,
    method: 'post',
    data: { cid, id, sort }
  })
}

