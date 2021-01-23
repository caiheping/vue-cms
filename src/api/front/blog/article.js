import HttpRequest from '@/utils/request'

// 查询文章
export function getArticle (params = {}) {
  return HttpRequest('/front/blog/getArticle', 'get', params)
}

// 查询某个文章
export function getArticleById (id) {
  return HttpRequest('/front/blog/getArticleById/' + id, 'get', {})
}
