import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import { Permission } from '@/definitions/constants'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        noCache: true
      }
    }]
  }
  // ,
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: '/version',
  //   index: 100,
  //   children: [{
  //     path: 'version',
  //     component: _import('version/index'),
  //     name: 'version',
  //     meta: {
  //       title: 'version',
  //       icon: 'lock',
  //       noCache: false
  //     }
  //   }]
  // }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userList',
    name: 'user',
    alwaysShow: true,
    meta: {
      title: 'user',
      roles: [Permission.MEMBER_MANAGEMENT],
      icon: 'lock'
    },
    children: [
      {
        path: 'userList',
        component: _import('user/userList'),
        name: 'userList',
        meta: {
          title: 'userList',
          roles: [Permission.MEMBER_LIST],
          noCache: true
        }
      },
      {
        path: 'inviteCode',
        component: _import('user/inviteCode'),
        name: 'inviteCode',
        meta: {
          title: 'inviteCode',
          roles: [Permission.INVITE_CODE_LIST],
          noCache: false
        }
      },
      {
        path: 'defaultFriends',
        component: _import('user/defaultFriends'),
        name: 'defaultFriends',
        meta: {
          title: 'defaultFriends',
          roles: [Permission.DEFAULT_MEMBER],
          noCache: false
        }
      },
      {
        path: 'memberOperateLog',
        component: _import('user/memberOperateLog'),
        name: 'memberOperateLog',
        meta: {
          title: 'memberOperateLog',
          roles: [Permission.MEMBER_OPERATE_LOG],
          noCache: true
        }
      }
    ]
  },
  {
    path: '/sensitiveWord',
    component: Layout,
    redirect: '/sensitiveWord/sensitiveWordList',
    name: 'sensitiveWord',
    alwaysShow: true,
    meta: {
      title: 'sensitiveWord',
      roles: [Permission.SENSITIVE_WORD_MANAGEMENT],
      icon: 'lock'
    },
    children: [
      {
        path: 'sensitiveWordList',
        component: _import('sensitiveWord/sensitiveWordList'),
        name: 'sensitiveWordList',
        meta: {
          title: 'sensitiveWordList',
          roles: [Permission.SENSITIVE_WORD_LIST],
          noCache: false
        }
      },
      {
        path: 'sensitiveWordHit',
        component: _import('sensitiveWord/sensitiveWordHit'),
        name: 'sensitiveWordHit',
        meta: {
          title: 'sensitiveWordHit',
          roles: [Permission.SENSITIVE_WORD_HIT],
          noCache: false
        }
      }
    ]
  },
  {
    path: '/group',
    component: Layout,
    redirect: '/group/groupList',
    name: 'group',
    alwaysShow: true,
    meta: {
      title: 'group',
      roles: [Permission.GROUP_MANAGEMENT],
      icon: 'lock'
    },
    children: [
      {
        path: 'groupList',
        component: _import('group/groupList'),
        name: 'groupList',
        meta: {
          title: 'groupList',
          roles: [Permission.GROUP_LIST],
          noCache: true
        }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/message/messageList',
    name: 'message',
    alwaysShow: true,
    meta: {
      title: 'message',
      icon: 'lock',
      roles: [Permission.MESSAGE_MANAGEMENT]
    },
    children: [
      {
        path: 'messageList',
        component: _import('message/messageList'),
        name: 'messageList',
        meta: {
          title: 'messageList',
          noCache: false,
          roles: [Permission.MESSAGE_LIST]
        }
      }
    ]
  },
  {
    path: '/chatroom',
    component: Layout,
    redirect: '/chatroom/chatList',
    name: 'chatroom',
    alwaysShow: true,
    meta: {
      title: 'chatroom',
      icon: 'lock',
      roles: [Permission.CHATROOM_MANAGEMENT]
    },
    children: [
      {
        path: 'chatroomList',
        component: _import('chatroom/chatroomList'),
        name: 'chatroomList',
        meta: {
          title: 'chatroomList',
          noCache: false,
          roles: [Permission.CHATROOM_LIST]
        }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    redirect: '/report/dailyReport',
    name: 'report',
    alwaysShow: true,
    meta: {
      title: 'report',
      icon: 'lock',
      roles: [Permission.REPORT_MANAGEMENT]
    },
    children: [
      {
        path: 'dailyReport',
        component: _import('report/dailyReport'),
        name: 'dailyReport',
        meta: {
          title: 'dailyReport',
          roles: [Permission.REPORT_LIST],
          noCache: false
        }
      }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/rechargeOrderList',
    name: 'finance',
    alwaysShow: true,
    meta: {
      title: 'finance',
      icon: 'lock',
      roles: [Permission.FINANCIAL_MANAGEMENT]
    },
    children: [
      {
        path: 'rechargeOrderList',
        component: _import('finance/rechargeOrderList'),
        name: 'rechargeOrderList',
        meta: {
          title: 'rechargeOrderList',
          noCache: false,
          roles: [Permission.RECHARGE_ORDER]
        }
      },
      {
        path: 'withdrawOrderList',
        component: _import('finance/withdrawOrderList'),
        name: 'withdrawOrderList',
        meta: {
          title: 'withdrawOrderList',
          noCache: false,
          roles: [Permission.WITHDRAW_ORDER]
        }
      },
      {
        path: 'memberBalanceLog',
        component: _import('finance/memberBalanceLog'),
        name: 'memberBalanceLog',
        meta: {
          title: 'memberBalanceLog',
          noCache: false,
          roles: [Permission.MEMBER_BALANCE_LOG]
        }
      },
      {
        path: 'rechargeChannelList',
        component: _import('finance/rechargeChannelList'),
        name: 'rechargeChannelList',
        meta: {
          title: 'rechargeChannelList',
          noCache: false,
          roles: [Permission.RECHARGE_CHANNEL]
        }
      }
    ]
  },
  {
    path: '/backend',
    component: Layout,
    redirect: '/backend/operateLog',
    name: 'backend',
    alwaysShow: true,
    meta: {
      title: 'backend',
      icon: 'lock',
      roles: [Permission.CMS_MANAGEMENT]
    },
    children: [
      {
        path: 'menu',
        component: _import('backend/menu'),
        name: 'menu',
        meta: {
          title: 'menu',
          noCache: false,
          roles: [Permission.AUTH_LIST]
        }
      },
      {
        path: 'role',
        component: _import('backend/role'),
        name: 'role',
        meta: {
          title: 'role',
          noCache: false,
          roles: [Permission.ROLE_LIST]
        }
      },
      {
        path: 'operateLog',
        component: _import('backend/operateLog'),
        name: 'operateLog',
        meta: {
          title: 'operateLog',
          noCache: false,
          roles: [Permission.SYSTEM_OPERATE_LOG]
        }
      },
      {
        path: 'backendUserList',
        component: _import('backend/backendUserList'),
        name: 'backendUserList',
        meta: {
          title: 'backendUserList',
          noCache: false,
          roles: [Permission.ADMIN_LIST]
        }
      },
      {
        path: 'userProfile',
        component: _import('backend/userProfile'),
        name: 'userProfile',
        meta: {
          title: 'userProfile',
          noCache: false,
          roles: [Permission.ADMIN_INFO]
        }
      }
    ]
  },
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/menu',
  //   name: 'permission',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock'
  //     // roles: [Permission.PermissionManagement]
  //   },
  //   children: [
  //     {
  //       path: 'menu',
  //       component: _import('permission/menu'),
  //       name: 'menu',
  //       meta: {
  //         title: 'menu',
  //         // roles: [Permission.Menu],
  //         noCache: false
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: _import('permission/role'),
  //       name: 'role',
  //       meta: {
  //         title: 'role',
  //         // roles: [Permission.Role],
  //         noCache: false
  //       }
  //     },
  //     {
  //       path: 'adminList',
  //       component: _import('permission/admin'),
  //       name: 'adminList',
  //       meta: {
  //         title: 'adminList',
  //         // roles: [Permission.Admin],
  //         noCache: false
  //       }
  //     },
  //     {
  //       path: 'adminInfo',
  //       component: _import('permission/adminInfo'),
  //       name: 'adminInfo',
  //       meta: {
  //         title: 'adminInfo',
  //         // roles: [Permission.Acl],
  //         noCache: false
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/userProfile',
  //   name: 'profile',
  //   alwaysShow: true,
  //   meta: {
  //     title: 'profile',
  //     icon: 'lock',
  //     roles: [Permission.Profile]
  //   },
  //   children: [
  //     {
  //       path: 'merchantProfile',
  //       component: _import('profile/merchantProfile'),
  //       name: 'merchantProfile',
  //       meta: {
  //         title: 'merchantProfile',
  //         roles: [Permission.ProfileMerchant],
  //         noCache: false
  //       }
  //     },
  //     {
  //       path: 'userProfile',
  //       component: _import('profile/userProfile'),
  //       name: 'userProfile',
  //       meta: {
  //         title: 'userProfile',
  //         roles: [Permission.ProfileUser],
  //         noCache: false
  //       }
  //     }
  //   ]
  // },
  {
    path: '/version',
    component: Layout,
    redirect: '/version/version',
    index: 100,
    name: 'version',
    alwaysShow: true,
    meta: {
      title: 'version',
      icon: 'lock',
      roles: [Permission.VERSION_GET]
    },
    children: [{
      path: 'version',
      component: _import('version/index'),
      name: 'versionInfo',
      meta: {
        title: 'versionInfo',
        roles: [Permission.VERSION_GET],
        noCache: false
      }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
