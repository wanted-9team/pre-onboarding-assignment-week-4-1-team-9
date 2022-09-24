import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page: 1,
  limit: 10,
}

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPaginationAction: (state, { payload }) => {
      state.page = payload
    },
    setLimitAction: (state, { payload }) => {
      state.limit = payload
    },
  },
})

export const { setPaginationAction, setLimitAction } = pageSlice.actions
export default pageSlice.reducer
