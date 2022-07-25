import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store'

type Locale = 'zh-CN' | 'ko-KR' | 'en-US'

const name = 'locale'

const locales: Locale[] = ['zh-CN', 'ko-KR', 'en-US']

const initialState: Locale = locales.find(item => item.includes(navigator.language)) || 'zh-CN'

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setLocale (state, action: PayloadAction<Locale>) {
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
export type { Locale }
export default slice
