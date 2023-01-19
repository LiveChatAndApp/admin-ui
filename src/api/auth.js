import request from '@/utils/request'

const prefix = '/admin'

/**
 * @description 請求項目 list 包含大項目、項目、子項目）
 *
 * @export
 * @params roleId 角色ID
 * @return {*}
 */
export function getOpLogAuthList(roleId) {
  return request({
    url: `${prefix}/auth/opLogAuth/list`,
    method: 'get',
    params: {
      roleId
    }
  })
}

/**
 * @description 角色列表 acl by roleId
 *
 * @param {*} roleId
 * @returns
 */
export function getAuthListRoleId(roleId) {
  return request({
    url: `${prefix}/auth/list`,
    method: 'get',
    params: { roleId }
  })
}

