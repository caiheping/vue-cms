import HttpRequest from '@/utils/request'

// 上传头像
export function uploadAvatar (params = {}) {
  return HttpRequest('/upload', 'post', params)
}
