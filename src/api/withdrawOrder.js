import request from '@/utils/request'
import download from '@/utils/download'

const prefix = '/admin'

/**
 * @description 提现订单 (查詢)
 *
 * @params channel 提现渠道 1:银行卡,2:游戏平台
 * @params createTimeGt 起
 * @params createTimeLe 迄
 * @params completeTimeGt
 * @params completeTimeLe
 * @params memberName 操作行为
 * @params page 頁碼
 * @params rows 每頁筆數
 * @params needSort
 * @params orderCode 订单偏号
 * @params status 订单状态 1:待审核,2:已完成,3:已拒绝
 * @returns
 */
export function getWithdrawOrderList(params) {
  return request({
    url: `${prefix}/withdrawOrder/page`,
    method: 'get',
    params
  })
}

/**
 * @description 審核
 *
 * @params id 提现订单ID
 * @params status 状态
 * @returns
 */
export function updateWithdrawOrderAudit(data) {
  return request({
    url: `${prefix}/withdrawOrder/audit`,
    method: 'post',
    data
  })
}

/**
 * @description 代付訂單 導出 cvs
 *
 * @param {*} params
 */
export function exportWithdrawOrderList(params) {
  download('/mgr/order/withdraw/list/csv', params)
}

export function pullWithdrawOrder(params) {
  return request({
    url: `/mgr/order/withdraw/${params.withdrawOrderId}/pull`,
    method: 'get',
    params
  })
}

export function setWithdrawOrderToSuccess(params) {
  return request({
    url: `/mgr/order/withdraw/${params.withdrawOrderId}/setSuccess`,
    method: 'get',
    params
  })
}

export function setWithdrawOrderToFailed(params) {
  return request({
    url: `/mgr/order/withdraw/${params.withdrawOrderId}/setFailed`,
    method: 'get',
    params
  })
}

/**
 * @description 代付訂單 刷新
 *
 * @param {*} params: {withdrawOrderId}
 * @returns
 */
export function refreshWithdrawOrder(params) {
  return request({
    url: `/mgr/order/withdraw/${params.withdrawOrderId}/${params.withdrawOrderStatus}/refresh`,
    method: 'get'
  })
}

/**
 * @description 代付訂單 支付失败按鈕 更新
 *
 * @param {*} params: {withdrawOrderId, status}
 * @returns
 */
export function updateWithdrawOrderFailStatus(params) {
  return request({
    url: `/mgr/order/withdraw/${params.withdrawOrderId}/${params.status}/failStatus`,
    method: 'get'
  })
}
