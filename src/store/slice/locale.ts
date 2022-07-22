import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store'

type State = 'zh-CN' | 'ko-KR' | 'en-US'

const name = 'locale'

const initialState: State = 'zh-CN' as State

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setLocale (state, action: PayloadAction<State>) {
      return action.payload
    }
  }
})

const { setLocale } = slice.actions

// 选择器
const getLocaleSelector = createSelector((state: RootState) => state[name], state => state)

export {
  setLocale,
  getLocaleSelector
}
export type { State }
export default slice
