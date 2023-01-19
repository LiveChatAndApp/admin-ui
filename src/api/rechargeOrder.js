import request from '@/utils/request'
const prefix = '/admin'

/**
 * @description 充值訂單 (查詢)
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
export function getRechargeOrderList(params) {
  return request({
    url: `${prefix}/rechargeOrder/page`,
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
export function updateRechargeOrderAudit(data) {
  return request({
    url: `${prefix}/rechargeOrder/audit`,
    method: 'post',
    data
  })
}

/**
 * @description 直接打币
 *
 * @params id 充值订单ID
 * @params totpCode OTP验证码
 * @returns
 */
export function updateDirectDeposit(data) {
  const { id, totpCode } = data
  return request({
    url: `${prefix}/rechargeOrder/directDeposit`,
    method: 'post',
    data: {
      id,
      totpCode
    }
  })
}

