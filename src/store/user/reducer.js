import { genarateBackendErrors } from "helpers/error.helper"
import User from "models/user.model"
import {
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  GET_USER_DETAIL,
  GET_USER_DETAIL_FAIL,
  GET_USER_DETAIL_SUCCESS,
  ADD_NEW_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  CONFIRM_USER_ACTION_FAIL,
  CONFIRM_USER_ACTION_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  paginatedResult: {
    results: [],
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    page: 1,
    pageStartIndex: 1,
    prevPage: null,
    totalDocs: 0,
    totalPages: 0,
  },
  document: new User(),
  error: {},

  loader: false,
  showMessage: false,
  actionSuccess: false,
  actionFail: false,
  message: {
    title: "",
    message: "",
  },
}

const users = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        loader: true,
        reload: false,
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        paginatedResult: action.payload.data,
        loader: false,
        showMessage: false,
        actionSuccess: true,
        actionFail: false,
        message: {
          title: "Received",
          message: action.payload.message,
        },
      }

    case GET_USERS_FAIL:
      return {
        ...state,

        error: genarateBackendErrors(action.payload),

        loader: false,
        showMessage: true,
        actionSuccess: false,
        actionFail: true,
        message: {
          title: "Error",
          message:
            typeof action.payload.message === "string" ||
            action.payload.message instanceof String
              ? action.payload.message
              : "No data received",
        },
      }

    case ADD_NEW_USER:
      return {
        ...state,
        loader: true,
        reload: false,
      }

    case ADD_USER_SUCCESS:
      return {
        ...state,
        document: action.payload.data,

        loader: false,
        reload: true,
        showMessage: true,
        actionSuccess: true,
        actionFail: false,
        message: {
          title: "Added",
          message: action.payload.message,
        },
      }

    case ADD_USER_FAIL:
      return {
        ...state,
        error: genarateBackendErrors(action.payload),

        loader: false,
        showMessage: true,
        actionSuccess: false,
        actionFail: true,
        message: {
          title: "Error",
          message:
            typeof action.payload.message === "string" ||
            action.payload.message instanceof String
              ? action.payload.message
              : "Adding Fail",
        },
      }

    case UPDATE_USER:
      return {
        ...state,
        loader: true,
        reload: false,
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        document: action.payload.data,

        loader: false,
        showMessage: true,
        actionSuccess: true,
        actionFail: false,
        message: {
          title: "Updated",
          message: action.payload.message,
        },
      }

    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: genarateBackendErrors(action.payload),

        loader: false,
        showMessage: true,
        actionSuccess: false,
        actionFail: true,
        message: {
          title: "Error",
          message:
            typeof action.payload.message === "string" ||
            action.payload.message instanceof String
              ? action.payload.message
              : "Update Fail",
        },
      }

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(
          user => user.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_USER_DETAIL:
      return {
        ...state,
        loader: true,
        reload: false,
      }

    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        document: action.payload.data,

        loader: false,
        reload: true,
        showMessage: true,
        actionSuccess: true,
        actionFail: false,
        message: {
          title: "Recived",
          message: action.payload.message,
        },
      }

    case GET_USER_DETAIL_FAIL:
      return {
        ...state,
        error: genarateBackendErrors(action.payload),

        loader: false,
        showMessage: true,
        actionSuccess: false,
        actionFail: true,
        message: {
          title: "Error",
          message:
            typeof action.payload.message === "string" ||
            action.payload.message instanceof String
              ? action.payload.message
              : "Recive Fail",
        },
      }

    case CONFIRM_USER_ACTION_SUCCESS:
      return {
        ...state,
        actionSuccess: false,
      }

    case CONFIRM_USER_ACTION_FAIL:
      return {
        ...state,
        actionFail: false,
      }

    default:
      return state
  }
}

export default users
