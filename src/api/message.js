import request from '@/utils/request'

const prefix = '/admin'

/**
 * @description 消息列表
 *
 * @export
 *
 * @params account1 用户帐号/群帐号
 * @params account2 用户帐号/群帐号
 * @params chatType 会话类型 1: 单聊, 2: 群组, 3: 聊天室, 4: 频道
 * @params content 内容
 * @params isRevert 撤回
 * @params messageType 消息类型 1:文本, 2: 语音, 3: 图片, 4: 文件, 5: 视频, 6: 建群, 7: 群加人, 8: 其它
 * @params senderRole 发送者角色 1: 系统管理者, 2: 用户端会员
 * @params createTimeGt 起
 * @params createTimeLe 迄
 * @params page 頁碼
 * @params rows 每頁筆數
 * @return {*}
 */
export function getMessageList(params) {
  return request({
    url: `${prefix}/message/page`,
    method: 'get',
    params
  })
}

/**
 * @description 撤回消息
 *
 * @export
 * @params id
 * @return {*}
 */
export function revertMessage(id) {
  return request({
    url: `${prefix}/message/revert/${id}`,
    method: 'post'
  })
}

/**
 * @description 最後消息列表
 *
 * @export
 * @params chatType	会话类型 1: 单聊, 2: 群组, 3: 聊天室, 4: 频道
 * @params needSort	false,示例值(false)
 * @params createTimeGt 起
 * @params createTimeLe 迄
 * @params page 頁碼
 * @params rows 每頁筆數
 * @params receiverId	接收者ID
 * @return {*}
 */
export function getLastChatList(params) {
  return request({
    url: `${prefix}/message/lastChat`,
    method: 'get',
    params
  })
}

/**
 * @description 發送消息
 *
 * @export
 * @params gid	群ID
 * @params messageType	消息类型 1:文本, 2: 语音, 3: 图片, 4: 文件, 5: 视频, 6: 建群, 7: 群加人, 8: 其它
 * @params text	文本
 * @params uploadFile	上传档案
 * @return {*}
 */
export function sendMessage(data) {
  return request({
    url: `${prefix}/message/send/message`,
    method: 'post',
    data
  })
}
