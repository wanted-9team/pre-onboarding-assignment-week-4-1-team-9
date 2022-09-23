import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page: 1,
}

const PageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPagination: (state, { payload }) => {
      state.page = payload
    },
  },
})

export const { setPagination } = PageSlice.actions
export default PageSlice.reducer
