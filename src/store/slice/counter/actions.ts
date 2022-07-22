import slice from '.'
// import { AppThunk } from '@/store'
import { getData, getData1 } from '@/api/common'
import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// 同步Action
export const {
  setName,
  incremented,
  decremented,
  receivedAll,
  incrementByAmount
} = slice.actions

// 异步Action
export function getValue (number: number) {
  return function (dispatch: Dispatch) {
    return getData({ number }).finally(() => {
      dispatch(incrementByAmount(number))
    })
  }
}

export const fetchValue = createAsyncThunk(`${slice.name}/fetchValue`, (num: number) => {
  return getData1()
})
