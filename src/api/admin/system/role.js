import HttpRequest from '@/utils/request'

// 查询角色
export function getRole (params = {}) {
  return HttpRequest('/admin/system/role', 'get', params)
}

// 查询某个角色
export function getRoleById (id) {
  return HttpRequest('/admin/system/role/' + id, 'get', {}, false)
}

// 添加角色
export function addRole (params = {}) {
  return HttpRequest('/admin/system/role', 'post', params)
}

// 修改角色
export function updateRole (params = {}) {
  return HttpRequest('/admin/system/role/' + params.id, 'put', params)
}

// 修改角色状态
export function updateRoleStatus (params = {}) {
  return HttpRequest('/admin/system/role/changeRoleStatus', 'put', params)
}

// 删除角色
export function delRole (ids) {
  return HttpRequest('/admin/system/role/' + ids, 'delete')
}

// 更新角色状态
export function changeRoleStatus (id, params = {}) {
  return HttpRequest(`/admin/system/role/${id}/updateStatus`, 'put', params)
}
