import HttpRequest from '@/utils/request'

// 获取公告
export function listNotice (params = {}) {
  return HttpRequest('/admin/system/notice', 'get', params)
}

// 获取某个公告
export function getNotice (id) {
  return HttpRequest('/admin/system/notice/' + id, 'get', {}, false)
}

// 删除公告
export function delNotice (ids) {
  return HttpRequest('/admin/system/notice/' + ids, 'delete')
}

// 添加公告
export function addNotice (params = {}) {
  return HttpRequest('/admin/system/notice', 'post', params)
}

// 修改公告
export function updateNotice (params = {}) {
  return HttpRequest('/admin/system/notice/' + params.id, 'put', params)
}
