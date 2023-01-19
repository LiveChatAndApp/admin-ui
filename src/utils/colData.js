import { DayOptions, ServiceFeeTypeOptions } from '@/definitions/options'
/**
 * @description 星期參數轉，且用逗號隔開
 *
 * @param {*} str
 * @returns
 */
export const getColDayName = (day) => {
  if (day === '' || day === undefined || day === null) {
    return ''
  } else {
    return day.split(',').map((o) => {
      return DayOptions[o].name
    }).join(',')
  }
}

/**
 *@description 轉換代付手续費
 *
 * @param {*} fee
 * @returns
 */
export const getColServiceFeeType = (fee) => {
  if (fee === 0 || fee === 1) {
    return ServiceFeeTypeOptions[fee].name
  } else {
    return ''
  }
}
