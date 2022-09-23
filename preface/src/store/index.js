import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'redux/slice/AuthSlice'
import { thunk } from 'redux/middleware/Thunk'
import PageSlice from 'redux/slice/PageSlice'

export const store = configureStore({
  reducer: { auth: authReducer, page: PageSlice },
  middleware: [thunk],
})
