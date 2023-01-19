import request from '@/utils/request'

/**
 * @description 角色列表 acl by roleId
 *
 * @param {*} roleId
 * @returns
 */
export function getAclListByRoleId(params) {
  return request({
    url: '/auth/list',
    method: 'get',
    params: params
  })
}

/**
 * @description 商戶日誌列表 （請求項目 list 包含大項目、項目、子項目）
 *
 * @param {*} roleId
 * @returns
 */
export function getAclMerchantListByRoleId(roleId) {
  return request({
    url: '/mgr/acl/merchant/list',
    method: 'get',
    params: { roleId }
  })
}

/**
 * @description 菜單列表 all
 *
 * @returns
 */
export function getUserAclList() {
  return getAclListByRoleId()
}
