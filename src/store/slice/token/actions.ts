import slice from '.'
import { AppThunk } from '@/store'
import { getWebToken } from '@/api/common'

// 同步action
export const { setToken } = slice.actions

// 异步Action
export function getToken (): AppThunk<Promise<string | null>> {
  return function (dispatch) {
    return getWebToken().then(data => {
      dispatch(setToken('token'))
      return data
    })
  }
}
