import todo from './slice/todo'
import token from './slice/token'
import route from './slice/route'
import counter from './slice/counter'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  [todo.name]: todo.reducer,
  [token.name]: token.reducer,
  [route.name]: route.reducer,
  [counter.name]: counter.reducer
})

export default reducer
