import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'redux/slice/AuthSlice'
import { thunk } from 'redux/middleware/Thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'auth',
  storage,
}

const persistAuth = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: { auth: persistAuth },
  middleware: [thunk],
})

export const persistor = persistStore(store)
