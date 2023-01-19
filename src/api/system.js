import request from '@/utils/request'
import { downloadRequest } from '@/utils/download'

const prefix = '/admin'

/**
 * @description 系统操作日誌列表
 *
 * @export
 * @params createTimeGt 起
 * @params createTimeLe 迄
 * @params authId 操作行为
 * @params page 頁碼
 * @params rows 每頁筆數
 * @params authId 操作行为
 * @params userName 操作帐号
 * @return {*}
 */
export function getSystemOperateLogList(params) {
  return request({
    url: `${prefix}/system/operateLog/page`,
    method: 'get',
    params
  })
}

/**
 * @description 系统操作日誌列表 csv 下載
 *
 * @export
 * @params createTimeGt 起
 * @params createTimeLe 迄
 * @params authId 操作行为
 * @params page 頁碼
 * @params rows 每頁筆數
 * @params authId 操作行为
 * @params userName 操作帐号
 * @return {*}
 */
export function exportSystemOperateLogCsv(params) {
  return downloadRequest({
    url: `${prefix}/system/operateLog/list/csv`,
    method: 'get',
    params
  })
}

