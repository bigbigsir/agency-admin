import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store'

type Currency = 'PHP' | 'RMB' | 'HKD'| 'KRW'

const name = 'currency'

const initialState: Currency = 'PHP' as Currency

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setCurrency (state, action: PayloadAction<Currency>) {
      return action.payload
    }
  }
})

const { setCurrency } = slice.actions

// 选择器
const getCurrencySelector = createSelector((state: RootState) => state[name], state => state)

export {
  setCurrency,
  getCurrencySelector
}
export type { Currency }
export default slice
