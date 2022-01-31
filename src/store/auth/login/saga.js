import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import {
  GET_CURRENT_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SOCIAL_LOGIN,
} from "./actionTypes"
import {
  apiError,
  loginSuccess,
  logoutUserSuccess,
  currentUserFail,
  currentUserSuccess,
} from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
// import {
//   getUserDetails,
//   postFakeLogin,
//   postJwtLogin,
//   postSocialLogin,
// } from "../../../helpers/fakebackend_helper"

import { postJwtLogin } from "../../../helpers/backend/backend.helper"

import { CSPINOFF } from "constants/app-statics"

const fireBaseBackend = getFirebaseBackend()

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.loginUser,
        user.email,
        user.password
      )
      yield put(loginSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogin, {
        username: user.email,
        password: user.password,
      })
      debugger
      const userRes = response.data.user
      const accessToken = response.data.payload
      localStorage.setItem("accessToken", JSON.stringify(accessToken))
      localStorage.setItem("authUser", JSON.stringify(userRes))
      localStorage.setItem("CSPIN", CSPINOFF)
      yield put(loginSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeLogin, {
        username: user.email,
        password: user.password,
      })
      localStorage.setItem("authUser", JSON.stringify(response))
      localStorage.setItem("CSPIN", CSPINOFF)
      yield put(loginSuccess(response))
    }
    history.push("/auth/loader")
  } catch (error) {
    console.log(error)
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("CSPIN")
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout)
      yield put(logoutUserSuccess(response))
    }
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend()
      const response = yield call(fireBaseBackend.socialLoginUser, data, type)
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    } else {
      const response = yield call(postSocialLogin, data)
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    }
    history.push("/products")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* fetchCurrentUserDetail({ userId }) {
  try {
    ////debugger
    const response = yield call(getUserDetails, userId)
    yield put(currentUserSuccess(response))
  } catch (error) {
    yield put(currentUserFail(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeLatest(SOCIAL_LOGIN, socialLogin)
  yield takeEvery(LOGOUT_USER, logoutUser)
  yield takeEvery(GET_CURRENT_USER, fetchCurrentUserDetail)
}

export default authSaga
