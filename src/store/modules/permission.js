import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param aclList
 * @param route
 */
function hasPermission(aclList, route) {
  if (route.meta && route.meta.roles) {
    return aclList.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param aclList
 */
function filterAsyncRouter(asyncRouterMap, aclList) {
  return asyncRouterMap.filter(route => {
    if (hasPermission(aclList, route)) {
      if (route.children && route.children.length > 0) {
        route.children = filterAsyncRouter(route.children, aclList)
      }
      return true
    }
    return false
  })
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    setRouters: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers).sort((a, b) => {
        const aIndex = a.index ? a.index : 0
        const bIndex = b.index ? b.index : 0
        return aIndex - bIndex
      })
    }
  },
  actions: {
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { aclList } = data
        let accessedRouters
        if (aclList.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, aclList)
        }
        commit('setRouters', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
