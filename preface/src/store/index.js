import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'redux/slice/AuthSlice'
import { thunk } from 'redux/middleware/Thunk'

export const store = configureStore({
  reducer: { auth: authReducer },
  middleware: [thunk],
})
