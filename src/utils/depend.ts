import { v1, v4 } from 'uuid'

/**
 * @description 获取uuid
 * @return string
 */
export function getUuidV1 () {
  return v1()
}

/**
 * @description 获取uuid
 * @return string
 */
export function getUuidV4 () {
  return v4()
}
