import Cookies from 'js-cookie'

let _token = Cookies.get('token')

let _aclList

export function getToken() {
  return _token
}

export function setToken(token) {
  _token = token
  Cookies.set('token', token)
}

export function removeToken() {
  _token = undefined
  Cookies.remove('token')
}

export function getAuthHeaderKey() {
  return 'Authorization'
}

export function getAuthHeaderValue() {
  return 'Bearer ' + getToken()
}

export function getAclList() {
  return _aclList
}

export function setAclList(aclList) {
  _aclList = aclList
}

/**
 * @description 判斷是否有 acl 功能
 *
 * @param {*} acl
 * @returns
 */
export function hasAcl(acl) {
  return !!_aclList.find(a => a === acl)
}
