import { constantRoutes } from '@/router'
import { getRouters } from '@/api/admin/system/menu'
import dynamicRouter from '@/router/dynamicRouter'

const permission = {
  state: {
    routes: [],
    menus: [],
    addRoutes: [],
    allRouterNames: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_ROUTER_NAME: (state, names) => {
      state.allRouterNames = names
    }
  },
  actions: {
    // 生成路由
    GenerateRoutes ({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          const accessedRoutes = filterAsyncRouter(res.data.rows).routes
          const accessedMenus = filterAsyncRouter(res.data.rows).menus
          accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
          commit('SET_ROUTES', accessedRoutes)
          commit('SET_MENUS', accessedMenus)
          // commit('SET_ROUTER_NAME', setRouterNames(this.state.permission.routes))
          resolve(accessedRoutes)
        })
      })
    }
  }
}

// 遍历后台传来的路由，生成路由
function filterAsyncRouter (asyncRouterMap) {
  // 过滤类型为方法的列表
  asyncRouterMap = asyncRouterMap.filter(item => item.menuType !== 'F')
  const routesObj = {}
  asyncRouterMap.forEach(item => {
    item.children = []
    item.component = dynamicRouter[item.component]
    routesObj[item.id] = item
  })
  const routes = []
  const menus = []
  asyncRouterMap.forEach(list => {
    const obj = {
      path: list.path,
      name: list.name,
      component: list.component,
      hidden: list.visible !== '1',
      children: list.children,
      meta: {
        title: list.title,
        menuType: list.menuType,
        noCache: true, // 不缓存
        icon: list.icon
      }
    }
    if (list.parentId !== 0) {
      routesObj[list.parentId].children.push(obj)
    } else {
      if (list.path.indexOf('/layout') !== -1 && list.parentId === 0) {
        routes.push({
          path: '/layout',
          name: list.name,
          component: dynamicRouter.Layout,
          hidden: list.visible !== '1',
          children: [obj],
          meta: {
            title: list.title,
            noCache: true, // 不缓存
            icon: list.icon
          }
        })
      } else {
        routes.push(obj)
      }
      menus.push(obj)
    }
  })
  return {
    routes,
    menus,
    routesObj
  }
}

export default permission
