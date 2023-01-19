import request from '@/utils/request'
const prefix = '/admin'
/**
 * @description 生成QRCode
 *
 * @param {*} adminUserId
 * @returns
 */
export function generateOtpQrcode(adminUserId) {
  return request({
    url: `${prefix}/otp/generate/qrCode`,
    method: 'post',
    data: {
      adminUserId
    }
  })
}

/**
 * @description 驗證 OTOPCode
 *
 * @param {*} data: {adminUserId, totpCode}
 * @returns
 */
export function verifyTotpCode(data) {
  return request({
    url: `${prefix}/otp/verify/totpCode`,
    method: 'post',
    data
  })
}

/**
 * @description 重置 OTP Secret Key
 *
 * @param {*} data: {userId}
 * @returns
 */
export function resetSecretKey(adminUserId) {
  return request({
    url: `${prefix}/otp/reset/secretKey`,
    method: 'post',
    data: {
      adminUserId
    }
  })
}
