import HttpRequest from '@/utils/request'

// 查询文章
export function getArticle (params = {}) {
  return HttpRequest('/blog/article', 'get', params)
}

// 查询某个角色
export function getArticleById (id) {
  return HttpRequest('/blog/article/' + id, 'get', {}, false)
}

// 添加角色
export function addArticle (params = {}) {
  return HttpRequest('/blog/article', 'post', params)
}

// 修改角色
export function updateArticle (params = {}) {
  return HttpRequest('/blog/article/' + params.id, 'put', params)
}
// 删除角色
export function delArticle (ids) {
  return HttpRequest('/blog/article/' + ids, 'delete')
}
