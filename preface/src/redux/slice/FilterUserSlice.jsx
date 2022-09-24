import { createSlice } from '@reduxjs/toolkit'
import { FILTER_TAG } from 'pages/user/userList/components/UserListTableBody'
const initialState = {
  filterValue: FILTER_TAG.ALL,
}

const filterUserSlice = createSlice({
  name: 'filteruser',
  initialState,
  reducers: {
    filterUserAction: (state, { payload }) => {
      state.filterValue = payload
    },
  },
})

export const { filterUserAction } = filterUserSlice.actions
export default filterUserSlice.reducer
