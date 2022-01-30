import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_USERS,
  GET_USER_DETAIL,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER,
} from "./actionTypes"
import {
  getUsersSuccess,
  getUsersFail,
  getUserDetailSuccess,
  getUserDetailFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getUsers,
  getUserDetails,
  addNewUser,
  deleteUser,
} from "helpers/fakebackend_helper"

function* fetchUsers({ page, sizePerPage, searchQuary, filterQuary }) {
  try {
    ////debugger
    const response = yield call(
      getUsers,
      page,
      sizePerPage,
      searchQuary,
      filterQuary
    )
    yield put(getUsersSuccess(response))
  } catch (error) {
    console.log(error)
    yield put(getUsersFail(error))
  }
}

function* fetchUserDetail({ transferId }) {
  try {
    const response = yield call(getUserDetails, transferId)
    yield put(getUserDetailSuccess(response))
  } catch (error) {
    yield put(getUserDetailFail(error))
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    debugger
    const response = yield call(updateUser, user.id, user)
    console.log(response)
    yield put(updateUserSuccess(response))
  } catch (error) {
    yield put(updateUserFail(error))
  }
}

function* onDeleteUser({ payload: vessel }) {
  try {
    const response = yield call(deleteUser, vessel)
    yield put(deleteUserSuccess(response))
  } catch (error) {
    yield put(deleteUserFail(error))
  }
}

function* onAddNewUser({ payload: vessel }) {
  try {
    const response = yield call(addNewUser, vessel)
    console.log(response)
    yield put(addUserSuccess(response))
  } catch (error) {
    yield put(addUserFail(error))
  }
}

function* usersSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(GET_USER_DETAIL, fetchUserDetail)
  yield takeEvery(ADD_NEW_USER, onAddNewUser)
  yield takeEvery(UPDATE_USER, onUpdateUser)
  yield takeEvery(DELETE_USER, onDeleteUser)
}

export default usersSaga
