import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page: 1,
  limit: 10,
}

const PageSlice = createSlice({
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

export const { setPaginationAction, setLimitAction } = PageSlice.actions
export default PageSlice.reducer
