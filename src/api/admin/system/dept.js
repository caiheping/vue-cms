import HttpRequest from '@/utils/request'

// 查询列表
export function getDept (params = {}) {
  return HttpRequest('/admin/system/department', 'get', params, false)
}

// 查询单个
export function getDeptById (id) {
  return HttpRequest('/admin/system/department/' + id, 'get', {}, false)
}

// 删除
export function delDept (ids) {
  return HttpRequest('/admin/system/department/' + ids, 'delete')
}

// 添加
export function addDept (params) {
  return HttpRequest('/admin/system/department', 'post', params)
}

// 修改
export function updateDept (params) {
  return HttpRequest('/admin/system/department/' + params.deptId, 'put', params)
}
