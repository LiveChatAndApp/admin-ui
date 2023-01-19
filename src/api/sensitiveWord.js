import request from '@/utils/request'

const prefix = '/admin'

/**
 * @description 敏感词列表
 *
 * @export
 * @params content 敏感词内容
 * @params createTimeLe 迄
 * @params page 頁碼
 * @params rows 每頁筆數
 * @params needSort false,示例值(false) 開啟才會有排序功能
 * @params sort
 * @return {*}
 */
export function getSensitiveWordList(params) {
  return request({
    url: `${prefix}/sensitiveWord/swPage`,
    method: 'get',
    params
  })
}

/**
 * @description 新增敏感词
 *
 * @export
 * @params contentList 敏感词 array
 * @return {*}
 */
export function addSensitiveWord(params) {
  return request({
    url: `${prefix}/sensitiveWord/swCreate`,
    method: 'post',
    params
  })
}

/**
 * @description 删除敏感词
 *
 * @export
 * @params ids
 * @return {*}
 */
export function deleteSensitiveWord(params) {
  return request({
    url: `${prefix}/sensitiveWord/swDelete`,
    method: 'post',
    params
  })
}

/**
 * @description 敏感词命中列表
 *
 * @export
 * @params page 頁碼
 * @params rows 每頁筆數
 * @params needSort false,示例值(false) 開啟才會有排序功能
 * @params sort
 * @return {*}
 */
export function getSwHitList(params) {
  return request({
    url: `${prefix}/sensitiveWord/swHitPage`,
    method: 'get',
    params
  })
}

/**
 * @description 清空命中敏感词
 *
 * @export
 * @return {*}
 */
export function deleteAllSensitiveWord() {
  return request({
    url: `${prefix}/sensitiveWord/swHitDeleteAll`,
    method: 'post'
  })
}

/**
 * @description 删除命中敏感词
 *
 * @export
 * @params ids
 * @return {*}
 */
export function deleteSensitiveWordHit(params) {
  return request({
    url: `${prefix}/sensitiveWord/swHitDelete`,
    method: 'post',
    params
  })
}
