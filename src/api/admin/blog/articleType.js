import HttpRequest from '@/utils/request'

// 查询文章类型
export function getArticleType (params = {}) {
  return HttpRequest('/admin/blog/articleType', 'get', params)
}

// 查询某个文章类型
export function getArticleTypeById (id) {
  return HttpRequest('/admin/blog/articleType/' + id, 'get', {}, false)
}

export function getAllType () {
  return HttpRequest('/admin/blog/articleType/getAllType', 'get', {})
}

// 添加文章类型
export function addArticleType (params = {}) {
  return HttpRequest('/admin/blog/articleType', 'post', params)
}

// 修改文章类型
export function updateArticleType (params = {}) {
  return HttpRequest('/admin/blog/articleType/' + params.id, 'put', params)
}
// 删除文章类型
export function delArticleType (ids) {
  return HttpRequest('/admin/blog/articleType/' + ids, 'delete')
}
