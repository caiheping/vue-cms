import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register']

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 前台
  if (to.fullPath.indexOf('/front') !== -1) {
    next()
  } else { // 后台
    if (getToken()) {
      /* has token */
      if (to.path === '/login') {
        next({ name: store.state.permission.allRouterNames[0] })
        NProgress.done()
      } else {
        if (!store.getters.userInfo) {
          // 判断当前用户是否已拉取完user_info信息
          store.dispatch('GetInfo').then(res => {
            store.dispatch('GenerateRoutes').then(accessRoutes => {
              router.addRoutes(accessRoutes) // 动态添加可访问路由表
              if (accessRoutes.length) { // 默认返回第一个
                // next({
                //   name: accessRoutes[0].children[0].name,
                //   query: to.query,
                //   replace: true
                // })
                next({
                  ...to,
                  replace: true
                })
              } else {
                next({
                  path: '/404',
                  replace: true
                })
              }
            })
          }).catch(err => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err)
              next({ path: '/' })
            })
          })
        } else {
          next()
        }
      }
    } else {
      // 没有token
      console.log(to.path)
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
        NProgress.done()
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
