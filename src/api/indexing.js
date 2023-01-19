import request from '@/utils/request'
const prefix = '/admin'

/**
 * @description 全部收款渠道不含分頁功能 （下拉選單 list，含代、支付）
 *
 * @returns
 */
export function getChannelIndexing() {
  return request({
    url: '/mgr/indexing/channel',
    method: 'get'
  })
}

/**
 * @description 全部都收款渠道（包含禁用）
 *
 * @returns
 */
export function getAllChannelIndexing() {
  return request({
    url: '/mgr/indexing/channelByStatus?status=-1',
    method: 'get'
  })
}

export function getAccountGroupIndexing() {
  return request({
    url: '/mgr/indexing/accountGroup',
    method: 'get'
  })
}

export function getAccountIndexing(params) {
  return request({
    url: '/mgr/indexing/account',
    method: 'get',
    params
  })
}

/**
 * @description 代付訂單 代付帳號選單
 *
 * @returns
 */
export function getWithdrawChannelIndexing() {
  return request({
    url: '/mgr/indexing/withdrawChannel',
    method: 'get'
  })
}

export function getBankCardIndexing(params) {
  return request({
    url: '/mgr/indexing/bankCard',
    method: 'get',
    params
  })
}

export function getMostUsedBankCardIndexing(params) {
  return request({
    url: '/mgr/indexing/bankCard/mostUsed',
    method: 'get',
    params
  })
}

export function getMerchantIndexing() {
  return request({
    url: '/mgr/indexing/merchant',
    method: 'get'
  })
}

/**
 * @description 商戶名稱下拉選單
 *
 * @returns
 */
export function getMerchantIndexingAll() {
  return request({
    url: '/mgr/indexing/merchantall',
    method: 'get'
  })
}

export function getUserIndexing() {
  return request({
    url: '/mgr/indexing/user',
    method: 'get'
  })
}

/**
 * @description 所有角色列表
 *
 * @return {*}
 */
export function getRoleIndexing() {
  return request({
    url: `${prefix}/indexing/role`,
    method: 'get'
  })
}

export function getBankAbbreviationIndexing() {
  return request({
    url: '/mgr/indexing/bankAbbreviation',
    method: 'get'
  })
}

export function getBulletinIndexing() {
  return request({
    url: '/mgr/indexing/bulletin',
    method: 'get'
  })
}

export function getCatalogIndexing() {
  return request({
    url: '/mgr/indexing/catalog',
    method: 'get'
  })
}

/**
 * @description 金流商 list （下拉選單用）
 *
 * @returns
 */
export function getVendorList() {
  return request({
    url: '/mgr/vendor/list',
    method: 'get'
  })
}

/**
 * @description 金流商 list for 報表下拉選單用
 *
 * @returns
 */
export function getAllVendorList() {
  return request({
    url: '/mgr/vendor/allVendorList',
    method: 'get'
  })
}

/**
 * @description 取得該金流商的渠道
 *
 * @param {*} params: { vendorId: id }
 * @returns
 */
export function getVendorChannelList(params) {
  return request({
    url: '/mgr/vendor/channelList',
    method: 'get',
    params
  })
}

/**
 * @description 代付渠道管理的金流商（選單）
 *
 * @returns
 */
export function getALLWithdrawVendorIndexing() {
  return request({
    url: '/mgr/indexing/withdrawVendor',
    method: 'get'
  })
}

/**
 * @description 對應金流商所屬的銀行 (代付銀行列表功能)
 *
 * @param {*} params
 * @returns
 */
export function getBankListByVendor(params) {
  return request({
    url: '/mgr/withdraw/channel/getBankListByVendor',
    method: 'get',
    params
  })
}

/**
 * @description 索引_所有品牌名称
 *
 * @param {*} params
 * @returns
 */
export function getBrandAllName(params) {
  return request({
    url: '/indexing/brandAllName',
    method: 'get'
  })
}
