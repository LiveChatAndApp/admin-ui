import request from '@/utils/request'

/**
 * @description 代付银行卡黑名單 無分頁
 *
 * @returns
 */
export function getAllWithdrawBankCardBlackList() {
  return request({
    url: '/mgr/withdraw/bankcard/blacklist/list',
    method: 'get',
    params: {
      paging: false
    }
  })
}

/**
 * @description 代付银行卡黑名單 (查詢)
 *
 * @param {*} params {id, size, page}
 * @returns
 */
export function getWithdrawBankCardBlackList(params) {
  return request({
    url: '/mgr/withdraw/bankcard/blacklist/list',
    method: 'get',
    params
  })
}

/**
 * @description 代付银行卡黑名單 新增
 *
 * @param {*} data: {bankName, status, memo}
 * @returns
 */
export function addWithdrawBankCardBlackList(data) {
  return request({
    url: '/mgr/withdraw/bankcard/blacklist/add',
    method: 'post',
    data
  })
}

/**
 * @description 代付银行卡黑名單 刪除
 *
 * @param {*} data: {bankName, status, memo}
 * @returns
 */
export function deleteWithdrawBankCardBlackList(data) {
  return request({
    url: '/mgr/withdraw/bankcard/blacklist/delete',
    method: 'post',
    data
  })
}

/**
 * @description 代付银行卡黑名單 更新
 *
 * @param {*} data
 * @returns
 */
export function updateWithdrawBankCardBlackList(data) {
  return request({
    url: '/mgr/withdraw/bankcard/blacklist/update',
    method: 'post',
    data
  })
}
