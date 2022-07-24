import { configureStore } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import cacheState, { setCacheState } from './state'
import reducer from './reducer'

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: cacheState
})

store.subscribe(() => setCacheState(store))

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof reducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
