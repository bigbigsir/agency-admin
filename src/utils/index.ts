/**
 * @description 判断参数是否为对象
 *
 * @param  {*} target
 * @return {boolean}
 */
export function isObject (target: any): boolean {
  return Object.prototype.toString.call(target) === '[object Object]'
}

/**
 * @description 通过path查找菜单
 * @param menus 树形菜单数据
 * @param key 对比的数据key
 * @param value 对比的数据value
 * @return menu 菜单
 */
export function findMenuByPath<T, K extends keyof T> (menus: T[] = [], key: K, value: T[K]): T | void {
  for (let i = 0, item; (item = menus[i]); i++) {
    if (item[key] === value) {
      return item
    } else {
      item = findMenuByPath(item['children' as K] as unknown as T[], key, value)
    }
    if (item) return item as T
  }
}
