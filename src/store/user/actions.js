import {
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  GET_USER_DETAIL,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAIL,
  ADD_NEW_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  CONFIRM_USER_ACTION_SUCCESS,
  CONFIRM_USER_ACTION_FAIL,
} from "./actionTypes"

export const getUsers = (page, sizePerPage, searchQuary, filterQuary) => ({
  type: GET_USERS,
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
})

export const getUsersSuccess = responce => ({
  type: GET_USERS_SUCCESS,
  payload: responce,
})

export const getUsersFail = error => ({
  type: GET_USERS_FAIL,
  payload: error,
})

export const addNewUser = data => ({
  type: ADD_NEW_USER,
  payload: data,
})

export const addUserSuccess = responce => ({
  type: ADD_USER_SUCCESS,
  payload: responce,
})

export const addUserFail = error => ({
  type: ADD_USER_FAIL,
  payload: error,
})

export const updateUser = responce => ({
  type: UPDATE_USER,
  payload: responce,
})

export const updateUserSuccess = responce => ({
  type: UPDATE_USER_SUCCESS,
  payload: responce,
})

export const updateUserFail = error => ({
  type: UPDATE_USER_FAIL,
  payload: error,
})

export const deleteUser = responce => ({
  type: DELETE_USER,
  payload: responce,
})

export const deleteUserSuccess = responce => ({
  type: DELETE_USER_SUCCESS,
  payload: responce,
})

export const deleteUserFail = error => ({
  type: DELETE_USER_FAIL,
  payload: error,
})

export const getUserDetail = transferId => ({
  type: GET_USER_DETAIL,
  transferId,
})

export const getUserDetailSuccess = responceDetails => ({
  type: GET_USER_DETAIL_SUCCESS,
  payload: responceDetails,
})

export const getUserDetailFail = error => ({
  type: GET_USER_DETAIL_FAIL,
  payload: error,
})

export const confirmUserActionSuccess = () => ({
  type: CONFIRM_USER_ACTION_SUCCESS,
  payload: false,
})

export const confirmUserActionFail = () => ({
  type: CONFIRM_USER_ACTION_FAIL,
  payload: false,
})
