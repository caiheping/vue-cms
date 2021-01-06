import HttpRequest from '@/utils/request'

// 查询文章
export function getArticleType (params = {}) {
  return HttpRequest('/blog/articleType', 'get', params)
}

// 查询某个角色
export function getArticleTypeById (id) {
  return HttpRequest('/blog/articleType/' + id, 'get', {}, false)
}

export function getAllType () {
  return HttpRequest('/blog/articleType/getAllType', 'get', {})
}


// 添加角色
export function addArticleType (params = {}) {
  return HttpRequest('/blog/articleType', 'post', params)
}

// 修改角色
export function updateArticleType (params = {}) {
  return HttpRequest('/blog/articleType/' + params.id, 'put', params)
}
// 删除角色
export function delArticleType (ids) {
  return HttpRequest('/blog/articleType/' + ids, 'delete')
}
