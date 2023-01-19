import request from '@/utils/request'
const prefix = '/admin'

/**
 * @description 充值訂單 (查詢)
 *
 * @params page 頁碼
 * @params rows 每頁筆數
 * @params needSort
 * @params paymentMethod 充值方式 1:线下支付,2:微信,3:支付宝
 * @returns
 */
export function getRechargeChannelList(params) {
  return request({
    url: `${prefix}/rechargeChannel/page`,
    method: 'get',
    params
  })
}

/**
 * @description 充值渠道列表編輯
 *
 * @params id 充值渠道ID
 * @params memo 备注
 * @params name 充值渠道名称
 * @params status 状态
 * @returns
 */
export function updateRechargeChannel(data) {
  return request({
    url: `${prefix}/rechargeChannel/update`,
    method: 'post',
    data
  })
}

/**
 * @description 充值渠道列表添加
 *
 * @params id 充值渠道ID
 * @params memo 备注
 * @params name 充值渠道名称
 * @params status 状态
 * @params paymentMethod 收款方式 1:线下支付,2:微信,3:支付宝
 * @params bankName 银行名称
 * @params QRCodeImageFile
 * @params realName 姓名
 * @returns
 */
export function addRechargeChannel(formData) {
  return request({
    url: `${prefix}/rechargeChannel/add`,
    method: 'post',
    data: formData
  })
}

/**
 * @description 充值渠道列表刪除
 *
 * @params id 充值渠道ID
 * @returns
 */
export function deleteRechargeChannel(id) {
  return request({
    url: `${prefix}/rechargeChannel/delete`,
    method: 'post',
    data: {
      id
    }
  })
}
