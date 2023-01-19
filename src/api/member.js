import request from '@/utils/request'
import { downloadRequest } from '@/utils/download'

const prefix = '/admin'

/**
 * @description 用户操作日誌列表
 *
 * @export
 * @params createTimeGt 起
 * @params createTimeLe 迄
 * @params authId 操作行为
 * @params page 頁碼
 * @params rows 每頁筆數
 * @params type 帳單類型
 * @params creatorIp IP地址
 * @params memberName 用户操作帐号
 * @params uid 用户UID
 * @return {*}
 */
export function getMemberOperateLogList(params) {
  return request({
    url: `${prefix}/member/operateLog/page`,
    method: 'get',
    params
  })
}

/**
 * @description 用户操作日誌 csv 下載
 *
 * @export
 * @params createTimeGt 起
 * @params createTimeLe 迄
 * @params authId 操作行为
 * @params type 帳單類型
 * @params creatorIp IP地址
 * @params memberName 用户操作帐号
 * @params uid 用户UID
 * @return {*}
 */
export function exportMemberOperateLogCsv(params) {
  return downloadRequest({
    url: `${prefix}/member/operateLog/list/csv`,
    method: 'get',
    params
  })
}

/**
 * @description 用戶列表 (查詢)
 *
 * @param {*} query: {userId, username, status, merchantId}
 * @returns
 */
export function getUserList(params) {
  return request({
    url: `${prefix}/member/page`,
    method: 'get',
    params
  })
}

/**
 * @description 批量管理允许管理号登入
 *
 * @param {*} data
 * @param isBlock 是否可以登入
 * @returns
 */
export function blockManagerLogin(data) {
  return request({
    url: `${prefix}/member/blockManagerLogin`,
    method: 'post',
    params: data
  })
}

/**
 * @description 批量管理允许建群
 *
 * @param {*} data
 * @param accountType 	帐号类型 1:普通帐号, 2:管理号
 * @param isBlock 是否可以建群
 * @returns
 */
export function blockCreateGroup(data) {
  return request({
    url: `${prefix}/member/blockCreateGroup`,
    method: 'post',
    params: data
  })
}

/**
 * @description 清除登陆错误次数
 *
 * @param {*} data
 * @param id
 * @returns
 */
export function cleanLoginError(data) {
  return request({
    url: `${prefix}/member/cleanLoginError/${data.id}`,
    method: 'post'
    // params: data
  })
}

/**
 * @description 批量新增用户
 *
 * @param {*} data
 * @param accountType	帐号类型 1:普通帐号, 2:管理号
 * @param batchCount	批量数量
 * @param loginPwd	登陆密码
 * @param avatarType	头像类型 1:系统默认, 2:随机生成
 * @param nickName	昵称
 * @param nickNameType	昵称类型 1:随机昵称, 2:自定义昵称
 * @param prefix	前缀
 * @returns
 */
export function addBatch(data) {
  return request({
    url: `${prefix}/member/addBatch`,
    method: 'post',
    params: data
  })
}

/**
 * @description 发送消息
 *
 * @param {*} data
 * @returns
 */
export function sendMessage(query) {
  return request({
    url: `${prefix}/member/sent/${query.id}`,
    method: 'post',
    params: { content: query.content }
  })
}

/**
 * @description 聊天对象列表
 *
 * @param {*} data
 * @returns
 */
export function chatList(id) {
  return request({
    url: `${prefix}/member/chat/${id}`,
    method: 'get'
  })
}

/**
 * @description 添加好友
 *
 * @param {*} data
 * @returns
 */
export function addFriend(data) {
  return request({
    url: `${prefix}/member/friend/add/${data.id}`,
    method: 'post',
    params: { member: data.member, verify: data.verify, verifyText: data.verifyText }
  })
}

/**
 * @description 聊天对象列表
 *
 * @param {*} data
 * @returns
 */
export function getChatHistoryList(data) {
  return request({
    url: `${prefix}/member/chat/${data.id}`,
    method: 'get',
    params: data
  })
}

/**
 * @description 查看聊天讯息
 *
 * @param {*} data
 * @returns
 */
export function getChatDetail(data) {
  return request({
    url: `${prefix}/member/chat/${data.id}/${data.friendId}`,
    method: 'get',
    params: data
  })
}

/**
 * @description 清空聊天记录
 *
 * @param {*} data
 * @returns
 */
export function clearChatHistory(data) {
  return request({
    url: `${prefix}/member/chat/clean/${data.id}/${data.friendId}`,
    method: 'post',
    params: data
  })
}

/**
 * @description 删除好友
 *
 * @param id
 * @returns
 */
export function deleteFriend(id) {
  return request({
    url: `${prefix}/member/friend/delete/${id}`,
    method: 'post'
  })
}
/**
 * @description 用戶列表 (新增)
 *
 * @param {*} data
 * @returns
 */
export function addMember(data) {
  return request({
    url: `${prefix}/member/add`,
    method: 'post',
    data
  })
}

/**
 * @description 用戶列表 (更新)
 *
 * @param {*} data
 * @returns
 */
export function updateMember(data) {
  return request({
    url: `${prefix}/member/edit`,
    method: 'post',
    data
  })
}
