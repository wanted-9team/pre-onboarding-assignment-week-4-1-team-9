import { put, takeEvery, call, delay } from 'redux-saga/effects'
import { getUserList, getUserSetting, getAccounts, searchUsers, getTotalUserList } from 'api'
import { GET_TOTAL_USER, GET_USER_LIST_PAGE, GET_SEARCH_USER } from './actionType'
import {
  getUserListAction,
  getUserAccountsAction,
  getUserSettingAction,
  getTotalResultsAction,
  getErrorMessageAction,
} from 'redux/slice/UserListSlice'

function* getTotalUserSaga() {
  yield delay(200)
  try {
    const totalUser = yield call(getTotalUserList)
    yield put(getTotalResultsAction(totalUser.data))
  } catch (err) {
    yield put(getErrorMessageAction(err))
  }
}

function* getUserListSaga({ payload }) {
  const { limit, page } = payload
  try {
    const userList = yield call(getUserList, page, limit)
    yield put(getUserListAction(userList.data))
  } catch (err) {
    yield put(getErrorMessageAction(err))
  }
}

function* getUserSettingsSaga() {
  try {
    const userSetting = yield call(getUserSetting)
    yield put(getUserSettingAction(userSetting.data))
  } catch (err) {
    yield put(getErrorMessageAction(err))
  }
}

function* getUserAccountsSaga() {
  try {
    const userAccount = yield call(getAccounts)
    yield put(getUserAccountsAction(userAccount.data))
  } catch (err) {
    yield put(getErrorMessageAction(err))
  }
}

function* getSearchUserSaga({ payload }) {
  const { searchInputText } = payload
  try {
    const searchUser = yield call(searchUsers, searchInputText)
    yield put(getUserListAction(searchUser.data))
  } catch (err) {
    yield put(getErrorMessageAction(err))
  }
}

export function* watchUserAsync() {
  yield takeEvery(GET_TOTAL_USER, getTotalUserSaga)
  yield takeEvery(GET_USER_LIST_PAGE, getUserSettingsSaga)
  yield takeEvery(GET_USER_LIST_PAGE, getUserAccountsSaga)
  yield takeEvery(GET_USER_LIST_PAGE, getTotalUserSaga)
  yield takeEvery(GET_USER_LIST_PAGE, getUserListSaga)
  yield takeEvery(GET_SEARCH_USER, getUserSettingsSaga)
  yield takeEvery(GET_SEARCH_USER, getUserAccountsSaga)
  yield takeEvery(GET_SEARCH_USER, getSearchUserSaga)
}
