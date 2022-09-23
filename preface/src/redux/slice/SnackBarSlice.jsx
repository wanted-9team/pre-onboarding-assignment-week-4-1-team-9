import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  success: false,
  failure: false,
  message: '',
}

const SnackBarSlice = createSlice({
  name: 'userlist',
  initialState,
  reducers: {
    setMessageAction: (state, { payload }) => {
      state.message = payload
    },
    setSuccessSnackAction: (state, { payload }) => {
      state.success = payload
    },
    setFailureSnackAction: (state, { payload }) => {
      state.failure = payload
    },
  },
})

export const { setSuccessSnackAction, setFailureSnackAction, setMessageAction } =
  SnackBarSlice.actions
export default SnackBarSlice.reducer
