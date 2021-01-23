import HttpRequest from '@/utils/request'

// 获取路由
export function getRouters (params = {}) {
  return HttpRequest('/admin/system/menu/userMenu', 'get', params, false)
}

// 获取路由
export function getMenu (params = {}) {
  return HttpRequest('/admin/system/menu', 'get', params, false)
}

// 获取某条菜单
export function getMenuById (id) {
  return HttpRequest('/admin/system/menu/' + id, 'get', {}, false)
}

export function delMenu (ids) {
  return HttpRequest('/admin/system/menu/' + ids, 'delete')
}

export function addMenu (params = {}) {
  return HttpRequest('/admin/system/menu', 'post', params)
}

export function updateMenu (params = {}) {
  return HttpRequest('/admin/system/menu/' + params.id, 'put', params)
}
