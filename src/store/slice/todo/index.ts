import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { RootState } from '@/store'

interface TodoItem {
  id: string
  index: number
}

const name = 'todo'

const adapter = createEntityAdapter<TodoItem>()

const todoSlice = createSlice({
  name,
  initialState: adapter.getInitialState(),
  reducers: {
    setAll: adapter.setAll,
    setOne: adapter.setOne,
    removeOne: adapter.removeOne,
    updateOne: adapter.updateOne
  }
})

// 选择器
export const {
  selectAll,
  selectById,
  selectEntities
} = adapter.getSelectors((state: RootState) => state[name])

export type { TodoItem }
export default todoSlice
