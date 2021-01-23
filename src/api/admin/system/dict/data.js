import HttpRequest from '@/utils/request'

// 查询字典数据列表
export function listData (params) {
  return HttpRequest('/admin/system/dictData', 'get', params)
}

// 查询字典数据详细
export function getDataById (id) {
  return HttpRequest('/admin/system/dictData/' + id, 'get', {}, false)
}

// 根据字典类型查询字典数据信息
export function getDicts (dictType) {
  return HttpRequest('/admin/system/showByType/' + dictType, 'get')
}

// 新增字典数据
export function addData (params) {
  return HttpRequest('/admin/system/dictData', 'post', params)
}

// 修改字典数据
export function updateData (params) {
  return HttpRequest('/admin/system/dictData/' + params.id, 'put', params)
}

// 删除字典数据
export function delData (ids) {
  return HttpRequest('/admin/system/dictData/' + ids, 'delete')
}
