import request from '@/utils/request'
import download from '@/utils/download'
import { downloadRequest } from '@/utils/download'
const prefix = '/admin'

/**
 * @description 經營報表 (查詢)
 *
 * @param {*} params
 * @returns
 */
export function getDailyReportList(params) {
  return request({
    url: `${prefix}/report/operate`,
    method: 'get',
    params
  })
}

/**
 * @description 經營報表 導出 cvs
 *
 * @param {*} params
 */
export function exportDailyReportListCsv(params) {
  return downloadRequest({
    url: `${prefix}/report/operate/csv`,
    method: 'get',
    params
  })
}

/**
 * @description 商戶報表 (查詢)
 *
 * @param {*} params
 * @returns
 */
export function getMerchantReportList(params) {
  return request({
    url: `${prefix}/report/merchant/list`,
    method: 'get',
    params
  })
}

/**
 * @description 商戶報表 導出 cvs
 *
 * @param {*} params
 */
export function exportMerchantReportListCsv(params) {
  download(`${prefix}/report/merchant/list/csv`, params)
}

export function getSumUpFrozenAmount() {
  return request({
    url: `${prefix}/report/merchant/frozenAmount`,
    method: 'get'
  })
}

export function getAgentReportList(params) {
  return request({
    url: `${prefix}/report/agent/list`,
    method: 'get',
    params
  })
}

export function exportAgentReportListCsv(params) {
  download(`${prefix}/report/agent/list/csv`, params)
}

export function getAgentReportDetailList(params) {
  return request({
    url: `${prefix}/report/agent/detail/list`,
    method: 'get',
    params
  })
}

export function exportAgentReportDetailListCsv(params) {
  download(`${prefix}/report/agent/detail/list/csv`, params)
}

export function redoReport(data) {
  return request({
    url: `${prefix}/report/redo`,
    method: 'put',
    data
  })
}
