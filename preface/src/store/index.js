import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'redux/slice/AuthSlice'
import { thunk } from 'redux/middleware/Thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import pageSlice from 'redux/slice/PageSlice'
import createSagaMiddleware from '@redux-saga/core'
import userListSlice from 'redux/slice/UserListSlice'
import snackBarSlice from 'redux/slice/SnackBarSlice'
import { rootSaga } from 'redux/saga'
import filterUserSlice from 'redux/slice/FilterUserSlice'
const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'auth',
  storage,
}

const persistAuth = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    auth: persistAuth,
    page: pageSlice,
    userList: userListSlice,
    snackbar: snackBarSlice,
    filterUser: filterUserSlice,
  },
  middleware: [sagaMiddleware, thunk],
})
sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)
