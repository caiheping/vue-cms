import HttpRequest from '@/utils/request'

// 查询列表
export function listUser (params = {}) {
  return HttpRequest('/admin/system/user', 'get', params)
}

// 查询某个用户
export function getUser (id) {
  return HttpRequest('/admin/system/user/' + id, 'get', {}, false)
}

// 删除
export function delUser (ids = []) {
  return HttpRequest('/admin/system/user/' + ids, 'delete')
}

// 新增
export function addUser (params = {}) {
  return HttpRequest('/admin/system/user', 'post', params)
}

// 修改
export function updateUser (params = {}) {
  return HttpRequest('/admin/system/user/' + params.id, 'put', params)
}

// 导出
export function exportUser (params = {}) {
  return HttpRequest('/admin/system/user/export', 'get', params)
}

// 修改图片
export function updateUserImg (userId, params = {}) {
  return HttpRequest(`/admin/system/user/${userId}/updateUserImg`, 'put', params)
}

// 重置密码
export function resetUserPwd (userId, params = {}) {
  return HttpRequest(`/admin/system/user/${userId}/resetPwd`, 'put', params)
}

// 更新用户密码
export function updateUserPwd (userId, params = {}) {
  return HttpRequest(`/admin/system/user/${userId}/updateUserPwd`, 'put', params)
}

// 导出模板
export function importTemplate (params = {}) {
  return HttpRequest('/admin/system/user/import', 'get', params)
}

// 获取用户信息
export function getInfo (params = {}) {
  return HttpRequest('/admin/system/getInfo', 'get', params, false)
}
