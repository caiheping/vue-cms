import HttpRequest from '@/utils/request'

// 查询文章
export function getArticle (params = {}) {
  return HttpRequest('/admin/blog/article', 'get', params)
}

// 查询某个文章
export function getArticleById (id) {
  return HttpRequest('/admin/blog/article/' + id, 'get', {}, false)
}

// 添加文章
export function addArticle (params = {}) {
  return HttpRequest('/admin/blog/article', 'post', params)
}

// 修改文章
export function updateArticle (params = {}) {
  return HttpRequest('/admin/blog/article/' + params.id, 'put', params)
}
// 删除文章
export function delArticle (ids) {
  return HttpRequest('/admin/blog/article/' + ids, 'delete')
}
