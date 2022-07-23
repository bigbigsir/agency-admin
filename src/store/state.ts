import { AppStore, RootState } from '.'
import { isObject } from '@/utils'

type StateKey = keyof RootState

const cacheName = 'react_redux_cache'
const stateKey: StateKey[] = [
  'token'
]

function getCacheState (): RootState {
  const cacheState = window.localStorage.getItem(cacheName)
  let state = cacheState && JSON.parse(cacheState)
  state = isObject(state) ? state : {}

  return state as RootState
}

export function setCacheState (store: AppStore) {
  const state = store.getState()
  const cacheState = {} as Record<StateKey, RootState[StateKey]>
  stateKey.forEach(key => (cacheState[key] = state[key]))
  window.localStorage.setItem(cacheName, JSON.stringify(cacheState))
}

const cacheState = getCacheState()

export default cacheState
