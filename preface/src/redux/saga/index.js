import { all } from 'redux-saga/effects'
import { watchUserAsync } from './userListSaga'

export function* rootSaga() {
  yield all([watchUserAsync()])
}
