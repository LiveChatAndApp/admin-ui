import request from '@/utils/request'

const prefix = '/admin'

/**
 * @description 群列表
 *
 * @param {*} params
 * @param groupName 群组名称
 * @param needSort false,示例值(false)
 * @param page 页码数
 * @param rows 每页记录数
 * @param sort 排序方式(_create_time,DESC、_update_time,DESC) 预设(_create_time,DESC),示例值(_create_time,DESC)
 * @returns
 */
export function getGroupList(params) {
  return request({
    url: `${prefix}/group/page`,
    method: 'get',
    params
  })
}

/**
 * @description 解散群组
 *
 * @param groupId	群組ID
 * @returns
 */
export function deleteGroup(groupId) {
  return request({
    url: `${prefix}/group/delete/${groupId}`,
    method: 'post'
  })
}

/**
 * @description 创建群组
 *
 * @param groupName	群组名称
 * @param uid	群主用户ID
 * @param avatarFile	头像
 * @returns
 */
export function addGroup(data) {
  return request({
    url: `${prefix}/group/add`,
    method: 'post',
    data
  })
}

/**
 * @description 编辑群组
 *
 * @param avatarFile	头像
 * @param groupId	群組ID
 * @param groupName	群组名称
 * @param muteType	禁言 0:正常 1:禁言普通成员 2:禁言整个群
 * @param privateChat	私聊 1: 正常, 2: 禁止
 * @param uid	群主用户ID
 * @returns
 */
export function updateGroup(data) {
  return request({
    url: `${prefix}/group/edit`,
    method: 'post',
    data
  })
}

/**
 * @description 群列表
 *
 * @param {*} params
 * @param groupId	群组ID
 * @param nickName	昵称
 * @param uid	用户ID
 * @param needSort false,示例值(false)
 * @param page 页码数
 * @param rows 每页记录数
 * @param sort 排序方式(_create_time,DESC、_update_time,DESC) 预设(_create_time,DESC),示例值(_create_time,DESC)
 * @returns
 */
export function getGroupMemberList(params) {
  return request({
    url: `${prefix}/group/member`,
    method: 'get',
    params
  })
}

/**
 * @description 添加成员
 *
 * @param groupId	群组ID
 * @param memberIdList	用户id流水号列表
 * @returns
 */
export function addGroupMember(data) {
  return request({
    url: `${prefix}/group/member/add`,
    method: 'post',
    data
  })
}

/**
 * @description 刪除群成員
 *
 * @param groupId	群组ID
 * @param memberIdList	用户id流水号列表
 * @returns
 */
export function deleteGroupMember(data) {
  return request({
    url: `${prefix}/group/member/delete`,
    method: 'post',
    data
  })
}

/**
 * @description 編輯群成員
 *
 * @param groupId	群组ID
 * @param memberIdList	用户id流水号列表
 * @param memberType	群成員身分 1: 成员, 2: 管理员, 3: 群主
 * @returns
 */
export function editGroupMember(data) {
  return request({
    url: `${prefix}/group/member/edit`,
    method: 'post',
    data
  })
}

/**
 * @description 查看群可添加成员
 *
 * @param groupId	群组ID
 * @param nickName	昵称
 * @param uid	用户ID
 * @param needSort false,示例值(false)
 * @param page 页码数
 * @param rows 每页记录数
 * @param sort 排序方式(_create_time,DESC、_update_time,DESC) 预设(_create_time,DESC),示例值(_create_time,DESC)
 * @returns
 */
export function getAddedGroupMemberList(params) {
  return request({
    url: `${prefix}/group/member/without`,
    method: 'get',
    params
  })
}

/**
 * @description 禁言群組
 *
 * @param groupId	群组ID
 * @param muteType 禁言 0:正常 1:禁言普通成员 2:禁言整个群
 * @returns
 */
export function groupMute(data) {
  return request({
    url: `${prefix}/group/mute`,
    method: 'post',
    data
  })
}

/**
 * @description 私聊群组
 *
 * @param groupId	群组ID
 * @param privateChat 私聊 1: 正常, 0: 禁止
 * @returns
 */
export function groupPrivateChat(data) {
  return request({
    url: `${prefix}/group/privateChat`,
    method: 'post',
    data
  })
}

/**
 * @description 變更群成員為管理員
 *
 * @param groupId	群组ID
 * @param memberId 用户id流水号
 * @param isManager 是否為管理員
 * @returns
 */
export function editManager(data) {
  return request({
    url: `${prefix}/group/member/manager/edit`,
    method: 'post',
    data
  })
}
