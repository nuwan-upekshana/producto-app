import { genarateBackendErrors } from "helpers/error.helper"
import Product from "models/product.model"
import {
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_DETAIL_FAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CONFIRM_VS_ACTION_FAIL,
  CONFIRM_VS_ACTION_SUCCESS,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAIL,
  SEARCH_PRODUCT,
  PRODUCT_UNLOAD,
  PRODUCT_UNLOAD_SUCCESS,
  PRODUCT_UNLOAD_FAIL,
  PRODUCT_INCIDENT,
  PRODUCT_INCIDENT_SUCCESS,
  PRODUCT_INCIDENT_FAIL,
  ADD_NEW_PRODUCT,
  UPDATE_PRODUCT,
  PRODUCT_REINIT,
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
  document: new Product(),
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

const products = (state = INIT_STATE, action) => {
  switch (action.type) {
    case PRODUCT_REINIT:
      return {
        ...state,
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
      }

    case GET_PRODUCTS:
      return {
        ...state,
        loader: true,
        reload: false,
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
      }
    case GET_PRODUCTS_SUCCESS:
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

    case GET_PRODUCTS_FAIL:
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

    case ADD_NEW_PRODUCT:
      return {
        ...state,
        loader: true,
        reload: false,
      }

    case ADD_PRODUCT_SUCCESS:
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

    case ADD_PRODUCT_FAIL:
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

    case UPDATE_PRODUCT:
      return {
        ...state,
        loader: true,
        reload: false,
      }

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        document: action.payload.data,

        loader: false,
        reload: true,
        showMessage: true,
        actionSuccess: true,
        actionFail: false,
        message: {
          title: "Updated",
          message: action.payload.message,
        },
      }

    case UPDATE_PRODUCT_FAIL:
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

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        vessels: state.vessels.filter(
          vessel => vessel.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case SEARCH_PRODUCT:
      return {
        ...state,

        loader: true,
      }
    case SEARCH_PRODUCT_SUCCESS: {
      const marineData = action.payload.data
      const vesselData = {
        ...state.document,
        name: marineData.SHIPNAME,
        imo: marineData.IMO,
        code: marineData.MMSI,
        mmsi: marineData.MMSI,
        marinetime_id: marineData.IMO,
        type: marineData.TYPE_NAME,
        image: marineData.URL,
        destination: marineData.DESTINATION,
        current_port: marineData.CURRENT_PORT,
        latitude: marineData.LAT,
        longitude: marineData.LON,
        vessel_type: marineData.TYPE_NAME,
        eta: marineData.ETA,
        vessel_speed: marineData.SPEED,
      }
      return {
        ...state,
        document: vesselData,

        loader: false,
        showMessage: false,
        actionSuccess: action.payload.success ? true : false,
        actionFail: action.payload.success ? false : true,
        message: {
          title: action.payload.success ? "Search" : "Error",
          message: action.payload.message,
        },
      }
    }

    case SEARCH_PRODUCT_FAIL: {
      const vesselData = {
        ...state.document,
      }
      return {
        ...state,
        error: action.payload,
        document: vesselData,

        loader: false,
        showMessage: true,
        actionSuccess: action.payload.success ? true : false,
        actionFail: action.payload.success ? false : true,
        message: {
          title: action.payload.success ? "Search" : "Error",
          message: action.payload.message,
        },
      }
    }

    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        loader: true,
        reload: false,
      }

    case GET_PRODUCT_DETAIL_SUCCESS:
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

    case GET_PRODUCT_DETAIL_FAIL:
      return {
        ...state,

        loader: false,
        showMessage: true,
        actionSuccess: action.payload.success ? true : false,
        actionFail: action.payload.success ? false : true,
        message: {
          title: action.payload.success ? "Find" : "Error",
          message: action.payload.message,
        },
      }

    case CONFIRM_VS_ACTION_SUCCESS:
      return {
        ...state,
        actionSuccess: false,
      }

    case CONFIRM_VS_ACTION_FAIL:
      return {
        ...state,
        actionFail: false,
      }
    case PRODUCT_UNLOAD:
      return {
        ...state,
        loader: true,
        reload: false,
      }

    case PRODUCT_UNLOAD_SUCCESS:
      return {
        ...state,

        loader: false,
        showMessage: true,
        actionSuccess: action.payload.success ? true : false,
        actionFail: action.payload.success ? false : true,
        message: {
          title: action.payload.success ? "Updated" : "Error",
          message: action.payload.message,
        },
      }

    case PRODUCT_UNLOAD_FAIL:
      return {
        ...state,

        loader: false,
        showMessage: true,
        actionSuccess: action.payload.success ? true : false,
        actionFail: action.payload.success ? false : true,
        message: {
          title: action.payload.success ? "Updated" : "Error",
          message: action.payload.message,
        },
      }

    //   case PRODUCT_INCIDENT:
    //     return {
    //       ...state,
    //       loader: true,
    //     }

    //   case PRODUCT_INCIDENT_SUCCESS:
    //     return {
    //       ...state,

    //       loader: false,
    //       showMessage: true,
    //       actionSuccess: action.payload.success ? true : false,
    //       actionFail: action.payload.success ? false : true,
    //       message: {
    //         title: action.payload.success ? "Added" : "Error",
    //         message: action.payload.message,
    //       },
    //     }

    //   case PRODUCT_INCIDENT_FAIL:
    //     return {
    //       ...state,

    //       loader: false,
    //       showMessage: true,
    //       actionSuccess: action.payload.success ? true : false,
    //       actionFail: action.payload.success ? false : true,
    //       message: {
    //         title: action.payload.success ? "Added" : "Error",
    //         message: action.payload.message,
    //       },
    //     }

    default:
      return state
  }
}

export default products
