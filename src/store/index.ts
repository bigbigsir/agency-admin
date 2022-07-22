import { configureStore } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { ThunkAction } from 'redux-thunk'
import cacheState, { setCacheState/* , asyncRestoreState */ } from './state'
import reducer from './reducer'

const store = configureStore({
  // reducer (state, action) {
  //   return action.type === '_asyncRestoreState'
  //     ? action.payload
  //     : reducer(state, action)
  // },
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: cacheState
})
// RN中的持久化数据，异步同步
// asyncRestoreState(store)
store.subscribe(() => setCacheState(store))

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof reducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
