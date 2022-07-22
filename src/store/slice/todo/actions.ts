import { nanoid } from '@reduxjs/toolkit'
import { AppThunk } from '@/store'
import slice, { TodoItem } from '.'

// 同步Action
export const {
  setAll,
  setOne,
  updateOne,
  removeOne
} = slice.actions

// 异步Action
export function getTodoList (number: number): AppThunk<Promise<TodoItem[]>> {
  const list = Array.from({ length: number }).map((item, index) => ({
    id: nanoid(),
    index
  }))
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch(setAll(list))
        resolve(list)
      }, 1000)
    })
  }
}
