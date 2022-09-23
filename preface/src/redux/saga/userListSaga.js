import { put, takeEvery, call, delay } from 'redux-saga/effects'
import {
  getUserList,
  getUserSetting,
  getAccounts,
  searchUsers,
  getTotalUserList,
  addUser,
  deleteUser,
  editUser,
} from 'api'
import {
  GET_TOTAL_USER,
  GET_USER_LIST_PAGE,
  GET_SEARCH_USER,
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
} from './actionType'
import {
  getUserListAction,
  getUserAccountsAction,
  getUserSettingAction,
  getTotalResultsAction,
  getErrorMessageAction,
} from 'redux/slice/UserListSlice'
import {
  setSuccessSnackAction,
  setFailureSnackAction,
  setMessageAction,
} from 'redux/slice/SnackBarSlice'

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
  const { page, limit } = payload
  yield delay(100)
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

function* addUserSaga({ payload }) {
  try {
    const addUserRes = yield call(addUser, payload)
    yield put(setSuccessSnackAction(true))
    yield put(setMessageAction(addUserRes.statusText))
  } catch (err) {
    yield put(setFailureSnackAction(true))
    yield put(setMessageAction(err.response.data))
  } finally {
    yield delay(3000)
    yield put(setSuccessSnackAction(false))
    yield put(setFailureSnackAction(false))
  }
}

function* editUserSaga({ payload }) {
  try {
    const editRes = yield call(editUser, payload)
    yield put(setSuccessSnackAction(true))
    yield put(setMessageAction(editRes.statusText))
  } catch (err) {
    yield put(setFailureSnackAction(true))
    yield put(setMessageAction(err.message))
  } finally {
    yield delay(3000)
    yield put(setSuccessSnackAction(false))
    yield put(setFailureSnackAction(false))
  }
}
function* deleteUserSaga({ payload }) {
  try {
    const deleteRes = yield call(deleteUser, payload)
    yield put(setSuccessSnackAction(true))
    yield put(setMessageAction(deleteRes.statusText))
  } catch (err) {
    yield put(setFailureSnackAction(true))
    yield put(setMessageAction(err.response.data))
  } finally {
    yield delay(3000)
    yield put(setSuccessSnackAction(false))
    yield put(setFailureSnackAction(false))
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
  yield takeEvery(ADD_USER, addUserSaga)
  yield takeEvery(ADD_USER, getTotalUserSaga)
  yield takeEvery(DELETE_USER, deleteUserSaga)
  yield takeEvery(DELETE_USER, getTotalUserSaga)
  yield takeEvery(EDIT_USER, editUserSaga)
}
