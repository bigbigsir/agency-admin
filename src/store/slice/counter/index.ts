import { RootState } from '@/store'
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

interface State {
  value: number,
  status?: string
  name?: string
  all?: number[]
  meta?: {}
}

const name = 'counter'

const initialState: State = {
  value: 0
}

const counterSlice = createSlice({
  name,
  initialState,
  reducers: {
    incremented (state) {
      state.value += 1
    },
    decremented (state) {
      state.value -= 1
    },
    setName (state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    incrementByAmount (state, action: PayloadAction<number>) {
      state.value += action.payload
    },
    receivedAll: {
      reducer (state, action: PayloadAction<number[], string, { currentPage: number }>) {
        state.all = action.payload
        state.meta = action.meta
      },
      prepare (payload: number[], currentPage: number) {
        return { payload, meta: { currentPage } }
      }
    },
    'counter/fetchValue/pending': (state) => {
      state.value = 1
      state.status = 'pending'
    },
    'counter/fetchValue/fulfilled': (state, action) => {
      console.log(action)
      state.value = 2
      state.status = 'fulfilled'
    },
    'counter/fetchValue/rejected': (state) => {
      state.value = 0
      state.status = 'rejected'
    }
  },
  extraReducers (builder) {
    // builder
    //   .addCase(pending, (state) => {
    //     state.value = 1
    //     state.status = 'pending'
    //   })
    //   .addCase(fulfilled, (state, action: PayloadAction<number>) => {
    //     state.value = 2
    //     state.status = 'fulfilled'
    //   })
    //   .addCase(rejected, (state) => {
    //     state.value = 0
    //     state.status = 'rejected'
    //   })
  }
})

// 选择器
export const getName = createSelector((state: RootState) => state[name], args => args.name)

export default counterSlice
