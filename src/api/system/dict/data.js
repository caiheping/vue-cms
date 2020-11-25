import HttpRequest from '@/utils/request'

// 查询字典数据列表
export function listData (params) {
  return HttpRequest('/system/dictData', 'get', params)
}

// 查询字典数据详细
export function getDataById (id) {
  return HttpRequest('/system/dictData/' + id, 'get', {}, false)
}

// 根据字典类型查询字典数据信息
export function getDicts (dictType) {
  return HttpRequest('/system/showByType/' + dictType, 'get')
}

// 新增字典数据
export function addData (params) {
  return HttpRequest('/system/dictData', 'post', params)
}

// 修改字典数据
export function updateData (params) {
  return HttpRequest('/system/dictData/' + params.id, 'put', params)
}

// 删除字典数据
export function delData (ids) {
  return HttpRequest('/system/dictData/' + ids, 'delete')
}
