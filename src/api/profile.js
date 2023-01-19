import request from '@/utils/request'

export function getMerchantProfile() {
  return request({
    url: '/mgr/profile/merchant/get',
    method: 'get'
  })
}

/**
 * @description 更新
 *
 * @param {*} data
 * @returns
 */
// export function updateUserProfile(data) {
//   return request({
//     url: '/mgr/profile/user/update',
//     method: 'put',
//     data
//   })
// }
