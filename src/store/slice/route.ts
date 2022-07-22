import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/store'
import { RouteParam } from '@/router/routes'

interface Route extends Omit<RouteParam, 'header' | 'element' | 'children'> {
  header: boolean
}

type State = Route | null

const name = 'route'
const initialState: State = null as State

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setRoute (state, action: PayloadAction<Route>) {
      return action.payload
    }
  }
})

const { setRoute } = slice.actions

// 选择器
const getRouteSelector = createSelector((state: RootState) => state[name], state => state)

export {
  setRoute,
  getRouteSelector
}
export default slice
