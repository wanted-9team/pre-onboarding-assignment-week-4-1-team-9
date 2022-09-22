import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: '',
  isLogin: false,
}

const auth = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    getAuth: (state, { payload }) => {
      return { ...state, userId: payload, isLogin: true }
    },
  },
})

export const { getAuth } = auth.actions

export default auth.reducer
