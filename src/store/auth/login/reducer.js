import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAIL,
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
  user: null,
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
        error: null,
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
      }
      break
    case LOGOUT_USER:
      state = { ...state }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state }
      break
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
    case GET_CURRENT_USER_SUCCESS:
      state = {
        ...state,
        user: action.payload.data,
      }
      break
    case GET_CURRENT_USER_FAIL:
      state = {
        ...state,
        error: action.payload.data,
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
