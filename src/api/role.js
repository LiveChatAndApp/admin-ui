import request from '@/utils/request'

const prefix = '/admin'

/**
 * @description 角色-列表
 *
 * @export
 * @params createTimeGt 起
 * @params createTimeLe 迄
 * @params page 頁碼
 * @params rows 每頁筆數
 * @params needSort false,示例值(false) 開啟才會有排序功能
 * @params sort
 * @params id 角色ID
 * @params level 级别 1:管理员, 2:员工
 * @params name 角色名称
 * @return {*}
 */
export function getRoleList(params) {
  return request({
    url: `${prefix}/role/page`,
    method: 'get',
    params
  })
}

/**
 * @description 角色-新增
 *
 * @export
 * @params adminAuthList []
 * @params level 用戶層級 1、2
 * @params memo 備註
 * @params name 角色名稱
 * @return {*}
 */
export function addRole(data) {
  const { adminAuthList, level, memo, name } = data
  return request({
    url: `${prefix}/role/page`,
    method: 'post',
    data: {
      adminAuthList, level, memo, name
    }
  })
}

/**
 * @description 角色-更新
 *
 * @export
 * @params adminAuthList []
 * @params id 角色ID
 * @params memo 備註
 * @params name 角色名稱
 * @return {*}
 */
export function updateRole(data) {
  const { adminAuthList, id, memo, name } = data
  return request({
    url: `${prefix}/role/update`,
    method: 'post',
    data: {
      adminAuthList,
      id,
      memo,
      name
    }
  })
}
