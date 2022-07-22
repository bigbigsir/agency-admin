import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/store'

type State = string | null

const name = 'token'

const initialState = null as State

const commonSlice = createSlice({
  name,
  initialState,
  reducers: {
    setToken (state, action: PayloadAction<State>) {
      return action.payload
    }
  }
})

// 选择器
export const getTokenSelector = createSelector((state: RootState) => state[name], state => !!state)

export default commonSlice
