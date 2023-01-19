import request from '@/utils/request'

/**
 * @description 代付渠道列表 (查詢)
 *
 * @param {*} params
 * @returns
 */
export function getWithdrawChannelList(params) {
  const p = {
    ...params,
    traceStatus: params.traceStatus === 0 || params.traceStatus === 1 ? params.traceStatus : undefined, // 只有 0 、 1
    connStatus: params.connStatus && params.connStatus.length > 0 ? params.connStatus : undefined, // 字串
    statusList: (params.statusList && params.statusList.length > 0)
      ? params.statusList.join(',')
      : ''
  }
  return request({
    url: '/mgr/withdraw/channel/list',
    method: 'get',
    params: p
  })
}

/**
 * @description 代付渠道列表 (新增)
 *
 * @param {*} data
 * @returns
 */
export function addWithdrawChannel(data) {
  return request({
    url: '/mgr/withdraw/channel/add',
    method: 'post',
    data
  })
}

export function updateWithdrawChannel(data) {
  return request({
    url: `/mgr/withdraw/channel/${data.accountId}/update`,
    method: 'put',
    data
  })
}

export function testWithdrawChannel(data) {
  return request({
    url: `/mgr/withdraw/channel/${data.accountId}/test`,
    method: 'post',
    data
  })
}

export function refreshWithdrawChannel(params) {
  return request({
    url: '/mgr/withdraw/channel/refresh',
    method: 'get',
    params
  })
}

/**
 * @description 取得代付銀行 list（這是全部，無查詢條件）
 *
 * @export
 * @returns
 */
export function getWithdrawBanks() {
  return request({
    url: '/mgr/withdraw/channel/bankcode/list',
    method: 'get',
    params: {
      paging: false
    }
  })
}

/**
 * @description 代付銀行列表 有查詢條件
 *
 * @export
 * @param {*} params {id, size, page}
 * @returns
 */
export function getWithdrawBankList(params) {
  return request({
    url: '/mgr/withdraw/channel/bankcode/list',
    method: 'get',
    params
  })
}

/**
 * @description 代付銀行列表 新增
 *
 * @export
 * @param {*} data: {bankName, status, memo}
 * @returns
 */
export function addWithdrawBank(data) {
  return request({
    url: '/mgr/withdraw/channel/bankcode/add',
    method: 'post',
    data
  })
}

/**
 * @description 代付銀行列表 更新
 *
 * @export
 * @param {*} data: {bankName, bankCode, memo, status, ccountId, id}
 * @returns
 */
export function updateWithdrawBank(data) {
  return request({
    url: '/mgr/withdraw/channel/bankcode/update',
    method: 'post',
    data
  })
}

/**
 * @description 代付渠道列表 刷新餘額
 *
 * @param {*} params: {accountId}
 * @returns
 */
export function refreshBalanceFromVendor(params) {
  return request({
    url: '/mgr/withdraw/channel/refreshBalanceFromVendor',
    method: 'get',
    params
  })
}

/**
 * @description 代付渠道列表 帳戶名稱 all list
 *
 * @returns
 */
export function getWithdrawChannelAllList() {
  return request({
    url: '/mgr/withdraw/channel/list',
    method: 'get',
    params: {
      paging: false
    }
  })
}

/**
 * @description 代付渠道列表(点击"连线刷新"使用)
 *
 * @param {*} params
 * @returns
 */
export function getCheckConnection(params) {
  return request({
    url: `/mgr/withdraw/channel/${params.accountId}/checkConnection`,
    method: 'get'
  })
}

/**
 * @description 代付渠道列表 (更新追踪狀態)
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
    url: `/mgr/withdraw/channel/${data.accountId}/traceStatus/update`,
    method: 'put',
    data
  })
}
