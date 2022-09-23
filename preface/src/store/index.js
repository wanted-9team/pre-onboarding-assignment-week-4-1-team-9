import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'redux/slice/AuthSlice'
import { thunk } from 'redux/middleware/Thunk'
import PageSlice from 'redux/slice/PageSlice'
import createSagaMiddleware from '@redux-saga/core'
import UserListSlice from 'redux/slice/UserListSlice'
import { rootSaga } from 'redux/saga'
import logger from 'redux-logger'
const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: { auth: authReducer, page: PageSlice, userList: UserListSlice },
  middleware: [logger, sagaMiddleware, thunk],
})

sagaMiddleware.run(rootSaga)
