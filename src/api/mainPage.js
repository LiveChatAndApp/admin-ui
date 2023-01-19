import request from '@/utils/request'

const prefix = '/admin'

/**
 * @description 首页-资讯
 *
 * @export
 * @params date 角色ID
 * @return {*}
 */
export function getMainPageInfo(date) {
  return request({
    url: `${prefix}/mainPage/info`,
    method: 'get',
    params: {
      date
    }
  })
}
