// @/utils/permission

import store from '@/store'

/**

 * 判断是否拥有页面权限

 */

export function pagePermission (permission = '') {
  // 这里要判断的权限没有设置的话，就等于不需要权限，直接返回 true
  if (!permission) return false
  const permissionList = store.state.permission.permissionList
  return !!permissionList.includes(permission)
}

/**

 * 判断是否拥有资源权限

 */

export function btnPermission (val = '') {
  // 这里要判断的权限没有设置的话，就等于不需要权限，直接返回 true
  if (!val) return false
  return store.state.permission.btnsPermissionList.includes(val)
}

export function includePermission (list = []) {
  // 这里要判断的权限没有设置的话，就等于不需要权限，直接返回 true
  if (!list.length) return false
  let flag = false
  list.forEach(item => {
    if (store.state.permission.btnsPermissionList.includes(item)) {
      flag = true
    }
  })
  return flag
}
