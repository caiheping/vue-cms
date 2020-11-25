import HttpRequest from '@/utils/request'

// 获取路由
export function getRouters (params = {}) {
  return HttpRequest('/system/menu/userMenu', 'get', params, false)
}

// 获取路由
export function getMenu (params = {}) {
  return HttpRequest('/system/menu', 'get', params, false)
}

// 获取某条菜单
export function getMenuById (id) {
  return HttpRequest('/system/menu/' + id, 'get', {}, false)
}

export function delMenu (ids) {
  return HttpRequest('/system/menu/' + ids, 'delete')
}

export function addMenu (params = {}) {
  return HttpRequest('/system/menu', 'post', params)
}

export function updateMenu (params = {}) {
  return HttpRequest('/system/menu/' + params.id, 'put', params)
}
