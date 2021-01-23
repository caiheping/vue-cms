import HttpRequest from '@/utils/request'

// 登录
export function login (params = {}) {
  return HttpRequest('/login', 'post', params)
}

// 登出
export function logout (params = {}) {
  return HttpRequest('/logout', 'post', params)
}

// 验证码
export function getCodeImg (params = {}) {
  return HttpRequest('/captcha', 'get', params, false)
}
