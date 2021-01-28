import Vue from 'vue'
import Router from 'vue-router'

/**
 * vue-router报错Uncaught (in promise)及解决方法
 * 对Router原型链上的push方法进行重写，这样就不用每次调用方法都要加上catch
 */
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/redirect',
    component: (resolve) => require(['@/views/admin/layout'], resolve),
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/admin/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: (resolve) => require(['@/views/admin/login'], resolve),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/user',
    component: (resolve) => require(['@/views/admin/layout'], resolve),
    hidden: true,
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/admin/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', menuType: 'C' }
      }
    ]
  },
  {
    path: '/dict',
    component: (resolve) => require(['@/views/admin/layout'], resolve),
    hidden: true,
    children: [
      {
        path: 'type/data/:id(\\d+)',
        component: (resolve) => require(['@/views/admin/system/dict/data'], resolve),
        name: 'Data',
        meta: { title: '字典数据', icon: '', menuType: 'C' }
      }
    ]
  },
  {
    path: '/404',
    hidden: true,
    component: (resolve) => require(['@/views/admin/error/404'], resolve),
    meta: {
      title: '404'
    }
  },
  {
    path: '/401',
    hidden: true,
    component: (resolve) => require(['@/views/admin/error/401'], resolve),
    meta: {
      title: '401'
    }
  },

  {
    path: '/front',
    name: 'Front',
    component: () => import('@/views/front/layout'),
    children: [
      {
        path: 'technique/:u_id/:type',
        name: 'Technique',
        component: () => import('@/views/front/technique'),
        meta: {
          title: '技术杂谈',
          keepAlive: false
        }
      },
      {
        path: 'detail/:u_id',
        name: 'Detail',
        component: () => import('@/views/front/detail'),
        meta: {
          title: '详情',
          keepAlive: true
        }
      }
    ]
  }
]

export default new Router({
  mode: 'hash', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
