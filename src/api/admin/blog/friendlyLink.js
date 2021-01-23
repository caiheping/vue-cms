import HttpRequest from '@/utils/request'

// 查询文章类型
export function getFriendlyLink (params = {}) {
  return HttpRequest('/admin/blog/friendlyLink', 'get', params)
}

// 查询某个文章类型
export function getFriendlyLinkById (id) {
  return HttpRequest('/admin/blog/friendlyLink/' + id, 'get', {}, false)
}

export function getAllType () {
  return HttpRequest('/admin/blog/friendlyLink/getAllType', 'get', {})
}

// 添加文章类型
export function addFriendlyLink (params = {}) {
  return HttpRequest('/admin/blog/friendlyLink', 'post', params)
}

// 修改文章类型
export function updateFriendlyLink (params = {}) {
  return HttpRequest('/admin/blog/friendlyLink/' + params.id, 'put', params)
}
// 删除文章类型
export function delFriendlyLink (ids) {
  return HttpRequest('/admin/blog/friendlyLink/' + ids, 'delete')
}
