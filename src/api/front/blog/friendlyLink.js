import HttpRequest from '@/utils/request'

export function getAllLink (params = {}) {
  return HttpRequest('/front/blog/friendlyLink/getFriendlyLink', 'get', params)
}
