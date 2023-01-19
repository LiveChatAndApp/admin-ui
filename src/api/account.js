import request from '@/utils/request'

/**
 * @description 帳號列表
 * @deprecated 已由 getNewAccountList 替換，如有使用到需要做修正
 *
 * @param {*} params
 * @returns
 */
export function getAccountList(params) {
  const p = {
    ...params,
    statusList: params.statusList && params.statusList.length > 0 ? params.statusList.join(',') : ''
  }
  return request({
    url: '/mgr/account/list',
    method: 'get',
    params: p
  })
}

/**
 * @description 支付渠道列表 (查詢)
 *
 * @param {*} params
 * @returns
 */
export function getNewAccountList(params) {
  return request({
    url: '/mgr/account/list',
    method: 'get',
    params
  })
}

/**
 *@description
 *@deprecated 已由 getAccountGroupChannelList 替換，如有使用到需要做替換方法
 *
 * @param {*} params
 * @returns
 */
export function getAccountChannelList(params) {
  const p = {
    ...params,
    statusList: params.statusList && params.statusList.length > 0 ? params.statusList.join(',') : ''
  }
  return request({
    url: '/mgr/account/group/accountChannellist',
    method: 'get',
    params: p
  })
}

/**
 * @description 查詢該渠道下的 alreadyUseChannel 與 canUseChannel list
 *
 * @param {*} params {channelId, accountGroupId }
 * @returns
 */
export function getAccountGroupChannelList(params) {
  return request({
    url: '/mgr/account/group/accountChannellist',
    method: 'get',
    params
  })
}

/**
 * @description 支付渠道列表 （新增）
 * @deprecated 已由 addNewAccount 替換，如有使用到需要做替換方法
 * @param {*} data
 * @returns
 */
export function addAccount(data) {
  return request({
    url: '/mgr/account/add',
    method: 'post',
    data
  })
}

/**
 * @description 支付渠道列表 （新增）
 * @param {*}
 * data = {
    vendorId, accountName, thirdMerchantId, thirdMerchantSign,
    status, memo, accountChannelList, accountChannelList
  }
 * @returns
 */
export function addNewAccount(data) {
  return request({
    url: '/mgr/account/add',
    method: 'post',
    data
  })
}

/**
 * @description 取得報表
 *
 * @param {*} data {aliid, startDate}
 * @returns
 */
export function accountReport(data) {
  return request({
    url: '/mgr/account/report',
    method: 'get',
    params: data
  })
}

/**
 * @description 支付渠道列表 (更新)
 * @deprecated 改使用 updateNewAccount
 *
 * @param {*} data
 * @returns
 */
export function updateAccount(data) {
  return request({
    url: `/mgr/account/${data.accountId}/update`,
    method: 'put',
    data
  })
}

/**
 * @description 更新帳戶資料
 *
 * @param {*} data
 * @returns
 */
export function updateNewAccount(data) {
  return request({
    url: `/mgr/account/${data.accountId}/update`,
    method: 'put',
    data
  })
}

/**
 * @description 支付渠道列表 (更新狀態)
 *
 * @param {*} data
 * @returns
 */
export function updateAccountStatus(data) {
  return request({
    url: `/mgr/account/${data.accountId}/status/update`,
    method: 'put',
    data
  })
}

/**
 * @description 取得批次上傳 url
 *
 * @returns
 */
export function getAddAccountInBatchUrl() {
  return process.env.BASE_API + '/mgr/account/add/batch'
}

export function testAccount(data) {
  return request({
    url: `/mgr/account/${data.accountId}/test`,
    method: 'post',
    data
  })
}

export function getBoundBankCard(params) {
  return request({
    url: `/mgr/account/${params.accountId}/bankcard`,
    method: 'get',
    params
  })
}

/**
 * @description 取得所有 Account list 不含分頁
 *
 * @returns
 */
export function getAllAccountList() {
  return request({
    url: '/mgr/account/list',
    method: 'get',
    params: {
      paging: false
    }
  })
}

/**
 * @description 從金流商取得該帳號list
 *
 * @param {*} params: {vendorId}
 * @returns
 */
export function getAccountListByVendor(params) {
  return request({
    url: '/mgr/account/getAccountListByVendor',
    method: 'get',
    params
  })
}

/**
 * @description 支付渠道列表(点击"连线刷新"使用)
 *
 * @param {*} params
 * @returns
 */
export function getCheckConnection(params) {
  return request({
    url: `/mgr/account/${params.accountId}/checkConnection`,
    method: 'get'
  })
}

/**
 * @description 支付渠道列表 (更新追踪狀態)
 *
 * @param {*} data
 * {
 *  traceStatus: 0 (禁用) 、 1 (启用)
 *  memo: 备注讯息
 * }
 * @returns
 */
export function updateTraceStatus(data) {
  return request({
    url: `/mgr/account/${data.accountId}/traceStatus/update`,
    method: 'put',
    data
  })
}

