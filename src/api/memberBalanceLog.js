import request from '@/utils/request'

const prefix = '/admin'

/**
 * @description 资金明细 list
 *
 * @export
 * @params createTimeGt 起
 * @params createTimeLe 迄
 * @params currency 幣種
 * @params page 頁碼
 * @params rows 每頁筆數
 * @params type 帳單類型
 * @params userId 用戶id
 * @return {*}
 */
export function getMemberBalanceList(params) {
  return request({
    url: `${prefix}/memberBalanceLog/page`,
    method: 'get',
    params
  })
}

