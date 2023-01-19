import request from '@/utils/request'
import download from '@/utils/download'

export function getAccountBalanceList(params) {
  const p = {
    ...params,
    statusList: (params.statusList && params.statusList.length > 0)
      ? params.statusList.join(',')
      : ''
  }
  return request({
    url: '/mgr/risk/report/account/balance/list',
    method: 'get',
    params: p
  })
}

export function exportAccountBalanceList(params) {
  const p = {
    ...params,
    statusList: (params.statusList && params.statusList.length > 0)
      ? params.statusList.join(',')
      : ''
  }
  download('/mgr/risk/report/account/balance/list/csv', p)
}

/**
 * @description 帳號額度 (查詢)
 *
 * @param {*} params
 * @returns
 */
export function getRiskReportAccountList(params) {
  // const fixParams = {
  //   ...params,
  //   statusList: (params.statusList && params.statusList.length > 0)
  //     ? params.statusList.join(',')
  //     : ''
  // }
  // return request({
  //   url: '/mgr/risk/report/account/list',
  //   method: 'get',
  //   params: fixParams
  // })
  return request({
    url: '/mgr/risk/report/account/list',
    method: 'get',
    params
  })
}

/**
 * @description 帳號額度 (查詢)
 * @description 原本 getRiskReportAccountList 改用此方法
 * @param {*} params
 * @returns
 */
export function getRiskAccountQuotaList(params) {
  return request({
    url: '/mgr/risk/account/quota/list',
    method: 'get',
    params
  })
}

/**
 * @description 帳號額度 (導出)
 *
 * @param {*} params
 */
export function exportRiskReportAccountList(params) {
  const fixParams = {
    ...params,
    statusList: (params.statusList && params.statusList.length > 0)
      ? params.statusList.join(',')
      : ''
  }
  download('/mgr/risk/report/account/list/csv', fixParams)
}

/**
 * @description 帳號額度 (導出)
 * @description 原本使用 exportRiskReportAccountList 改替換這個
 * @param {*} params
 */
export function exportRiskAccountQuotaList(params) {
  download('/mgr/risk/account/quota/list/csv', params)
}

/**
 * @description 商戶報表 (查詢)
 *
 * @param {*} params
 * @returns
 */
export function getRiskReportMerchantList(params) {
  return request({
    url: '/mgr/risk/report/merchant/list',
    method: 'get',
    params
  })
}

/**
 * @description 商戶報表 導出 cvs
 *
 * @param {*} params
 */
export function exportRiskReportMerchantList(params) {
  download('/mgr/risk/report/merchant/list/csv', params)
}
