// 递归返回菜单权限列表
export function menuRecursion (arr, recursion = []) {
  if (arr.length) {
    arr.forEach(item => {
      if (item.url && (!item.list || !item.list.length)) {
        recursion.push(item.url)
      }
      if (item.list && item.list.length) {
        menuRecursion(item.list, recursion)
      }
    })
  }
  return recursion
}

export function menuLists (arr) {
  if (arr.length) {
    arr.forEach(item => {
      item.label = item.alias
      item.value = item.alias
      if (item.children.length) {
        menuLists(item.children)
      }
    })
  }
}

export function formatMenus (originalArr) {
  const arr1 = []
  const arr2 = []
  const obj = {}
  originalArr.forEach(item => {
    if (!arr1.includes(item.parentId)) {
      arr1.push(item.parentId)
      obj[item.parentId] = []
    } else {
      obj[item.parentId].push(item)
    }
  })
  originalArr.forEach(item => {
    for (const key in obj) {
      if (item.menuId === parseInt(key)) {
        item.children = obj[key]
        arr2.push(item)
      }
    }
  })
  console.log(arr2)
  return arr2
}
