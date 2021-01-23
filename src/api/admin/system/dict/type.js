import HttpRequest from '@/utils/request'

// 查询列表
export function listType (params = {}) {
  return HttpRequest('/admin/system/dictType', 'get', params)
}

// 查询某一个
export function getType (id) {
  return HttpRequest('/admin/system/dictType/' + id, 'get', {}, false)
}

// 删除
export function delType (ids) {
  return HttpRequest('/admin/system/dictType/' + ids, 'delete')
}

// 添加
export function addType (params = {}) {
  return HttpRequest('/admin/system/dictType', 'post', params)
}

// 修改
export function updateType (params = {}) {
  return HttpRequest('/admin/system/dictType/' + params.id, 'put', params)
}
