import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'redux/slice/AuthSlice'
import { thunk } from 'redux/middleware/Thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import PageSlice from 'redux/slice/PageSlice'
import createSagaMiddleware from '@redux-saga/core'
import UserListSlice from 'redux/slice/UserListSlice'
import SnackBarSlice from 'redux/slice/SnackBarSlice'
import { rootSaga } from 'redux/saga'
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'auth',
  storage,
}

const persistAuth = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: { auth: persistAuth, page: PageSlice, userList: UserListSlice, snackbar: SnackBarSlice },
  middleware: [logger, sagaMiddleware, thunk],
})
sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)
