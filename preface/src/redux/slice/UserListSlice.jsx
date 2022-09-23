import { createSlice } from '@reduxjs/toolkit'
import { findEqualUserId, findEqualUuid } from 'utils/findEqualData'

const initialState = {
  userList: [],
  userSettings: [],
  userAccounts: [],
  totalResults: 0,
  errorMsg: '',
  searchUser: [],
}

const UserListSlice = createSlice({
  name: 'userlist',
  initialState,
  reducers: {
    getUserListAction: (state, { payload }) => {
      state.userList = payload
        .filter(user => user.uuid)
        .map(user => ({
          ...user,
          ...findEqualUuid(user, state.userSettings),
          ...findEqualUserId(user, state.userAccounts),
        }))
    },
    getUserSettingAction: (state, { payload }) => {
      state.userSettings = payload
    },
    getUserAccountsAction: (state, { payload }) => {
      state.userAccounts = payload
    },
    getTotalResultsAction: (state, { payload }) => {
      state.totalResults = payload.filter(user => user.uuid).length
    },
    getErrorMessageAction: (state, { payload }) => {
      state.errorMsg = payload
    },
  },
})

export const {
  getUserListAction,
  getTotalResultsAction,
  getErrorMessageAction,
  getUserSettingAction,
  getUserAccountsAction,
} = UserListSlice.actions
export default UserListSlice.reducer
