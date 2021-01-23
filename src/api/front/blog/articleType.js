import HttpRequest from '@/utils/request'

export function getAllType (params = {}) {
  return HttpRequest('/front/blog/articleType/getAllType', 'get', params)
}
