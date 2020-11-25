import axios from 'axios'
import { getToken } from '@/utils/auth'

// const mimeMap = {
//   xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//   zip: 'application/zip'
// }

const baseUrl = process.env.VUE_APP_BASE_API
export function downLoadZip (str, filename) {
  axios({
    method: 'get',
    url: baseUrl + str,
    responseType: 'blob',
    headers: { Authorization: 'Bearer ' + getToken() }
  }).then(res => {
    const blob = new Blob([res.data], { type: 'application/zip' })
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob) // 创建下载的链接
    downloadElement.href = href
    downloadElement.download = filename + '.zip' // 下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() // 点击下载
    document.body.removeChild(downloadElement) // 下载完成移除元素
    window.URL.revokeObjectURL(href) // 释放掉blob对象
  })
}
