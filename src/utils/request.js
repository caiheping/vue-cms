import axios from 'axios'
import store from '@/store'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

axios.defaults.withCredentials = true // 跨域访问需要发送cookie时一定要加这句

let httpTime = 0

// 添加请求拦截器，在发送请求之前做些什么
axios.interceptors.request.use(function (config) {
  httpTime++
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
  return response.data
}, function (error) {
  return Promise.reject(error)
})

// 封装数据返回失败提示函数
function errorState (error) {
  let offset = 1
  let message = ''
  switch (error.response.status) {
    case 400:
      for (const key in error.response.data.error) {
        message = error.response.data.error[key].message || '参数错误'
        Message({
          type: 'error',
          offset: 40 * offset,
          message
        })
        offset++
      }
      break
    case 401:
      message = 'token失效'
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
      break
    case 403:
      message = '拒绝访问'
      Message({
        type: 'error',
        message
      })
      break
    case 500:
      message = error.response.data.message || '服务器异常'
      Message({
        type: 'error',
        message
      })
      break
    default:
      Message({
        type: 'error',
        message: '服务器异常'
      })
      message = '服务器异常'
  }
}

// 封装axios
function HttpRequest (url, method = 'GET', params = {}, isLoading = true) {
  method = method.toUpperCase()
  if (isLoading && method === 'GET' && !store.state.app.loading) {
    store.state.app.loading = true
  }
  // 设置token
  const token = getToken()
  const httpDefault = {
    baseURL: process.env.VUE_APP_BASE_API,
    method,
    url,
    headers: {
      withCredentials: true,
      // token: token,
      Authorization: 'Bearer ' + token,
      vision: '1.0.0',
      operating_system: 'Web',
      'Content-Type': 'application/json; charset=utf-8'
    },
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data: method === 'POST' || method === 'PUT' ? params : null,
    timeout: 10000
  }

  return new Promise((resolve, reject) => {
    axios(httpDefault).then((response) => {
      resolve(response)
    }).catch((response) => {
      errorState(response)
      reject(response)
    }).then(function () {
      // always executed
      httpTime--
      // console.log(httpTime, url)
      if (!httpTime) {
        store.state.app.loading = false
      }
    })
  })
}

export default HttpRequest
