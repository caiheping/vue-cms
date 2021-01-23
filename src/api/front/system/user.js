import HttpRequest from '@/utils/request'

// 获取用户信息
export function getInfo (params = {}) {
  return HttpRequest('/front/system/getInfo', 'get', params, false)
}
