import request from '@/utils/request'

/**
 * @description 邀请码查询 - 邀请码列表
 * @param code 验证码
 * @param note 备注
 * @param page 页码数
 * @param registerTimeGt 统计注册人数开始时间(yyyy-MM-dd HH:mm:ss)
 * @param registerTimeLe 统计注册人数结束时间(yyyy-MM-dd HH:mm:ss)
 * @param rows 每页记录数
 * @param status 状态
 * @returns
 */
export function getInviteCodeList(data) {
  return request({
    url: '/admin/inviteCode/page',
    method: 'get',
    params: data
  })
}

/**
 * @description 新增邀请码
 * @param friendsDefaultType 预设好友模式 1: 所有, 2: 轮询
 * @param inviteCode	邀请码
 * @param status	状态 0: 关闭, 1: 开启
 * @param uid	预设好友用户Id
 * @param welcomeText	预设好友欢迎词
 * @param note	备注
 * @returns
 */
export function addInviteCode(data) {
  return request({
    url: '/admin/inviteCode/add',
    method: 'post',
    params: data
  })
}

/**
 * @description 删除邀请码
 * @param id	id
 * @returns
 */
export function deleteInviteCode(id) {
  return request({
    url: `/admin/inviteCode/delete/${id}`,
    method: 'post'
  })
}

/**
 * @description 编辑邀请码
 * @param friendsDefault	预设好友模式 1: 所有, 2: 轮询
 * @param inviteCode	邀请码
 * @param status	状态 0: 关闭, 1: 开启
 * @param note	备注
 * @returns
 */
export function editInviteCode(data) {
  return request({
    url: `/admin/inviteCode/edit`,
    method: 'post',
    params: data
  })
}

/**
 * @description 预设好友列表
 * @param id 流水號
 * @returns
 */
export function getFriendList(data) {
  return request({
    url: `/admin/inviteCode/defaultMember/${data.id}`,
    method: 'get',
    params: data
  })
}

/**
 * @description 邀请码查询 - 邀请码列表
 * @param id 流水號
 * @returns
 */
export function getGroupList(data) {
  return request({
    url: `/admin/inviteCode/defaultGroup/${data.id}`,
    method: 'get',
    params: data
  })
}
