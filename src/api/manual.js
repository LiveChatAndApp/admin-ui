import request from '@/utils/request'

/**
 * @description 充-提
 *
 * @param {*} data: {userId, username, status, merchantId}
 * @param type	类型 1:手动充值,2:手动提取
 * @param amount	金额
 * @param freeze	冻结金额
 * @returns
 */
export function manualRechargeWithdraw(query) {
  return request({
    url: '/admin/manual/rechargeWithdraw',
    method: 'post',
    params: query
  })
}
