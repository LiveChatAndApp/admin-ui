import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getAclList, getToken, setAclList, removeToken } from '@/utils/auth'
import { getSession } from '@/api/login' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      let aclList = getAclList()
      if (aclList) {
        route(aclList, from, to, next)
      } else {
        getSession().then(data => {
          if (data) {
            data.aclList = data.menus.map(acl => acl.code)
            store.dispatch('setUserInfo', data)
            aclList = data.aclList
            setAclList(aclList)
            route(aclList, from, to, next)
          } else {
            removeToken()
            next('/login')
          }
        }).catch(() => {
          removeToken()
          next('/login')
        })
      }
    }
  } else {
    /* has no token*/
    if (to.path === '/login') { // 登录页，直接进入
      next()
    } else {
      next('/login') // 重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

function route(aclList, from, to, next) {
  if (!store.getters.permissionRouters) {
    store.dispatch('generateRoutes', { aclList }).then(() => { // 根据roles权限生成可访问的路由表
      router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
    })
  }
  next()
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
