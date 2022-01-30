import {
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAIL,
  ADD_NEW_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  GET_PRODUCT_DETAIL_FAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  SEARCH_PRODUCT,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAIL,
  CONFIRM_VS_ACTION_FAIL,
  CONFIRM_VS_ACTION_SUCCESS,
  PRODUCT_UNLOAD_FAIL,
  PRODUCT_UNLOAD_SUCCESS,
  PRODUCT_UNLOAD,
  PRODUCT_REINIT,
} from "./actionTypes"

export const getProducts = (page, sizePerPage, searchQuary, filterQuary) => ({
  type: GET_PRODUCTS,
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
})

export const getProductsSuccess = responce => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: responce,
})

export const addNewProduct = data => ({
  type: ADD_NEW_PRODUCT,
  payload: data,
})

export const addProductSuccess = responce => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: responce,
})

export const addProductFail = error => ({
  type: ADD_PRODUCT_FAIL,
  payload: error,
})

export const updateProduct = responce => ({
  type: UPDATE_PRODUCT,
  payload: responce,
})

export const updateProductSuccess = responce => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: responce,
})

export const updateProductFail = error => ({
  type: UPDATE_PRODUCT_FAIL,
  payload: error,
})

export const deleteProduct = responce => ({
  type: DELETE_PRODUCT,
  payload: responce,
})

export const deleteProductSuccess = responce => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: responce,
})

export const deleteProductFail = error => ({
  type: DELETE_PRODUCT_FAIL,
  payload: error,
})

export const getProductsFail = error => ({
  type: GET_PRODUCTS_FAIL,
  payload: error,
})

export const getProductDetail = payload => ({
  type: GET_PRODUCT_DETAIL,
  payload,
})

export const getProductDetailSuccess = responceDetails => ({
  type: GET_PRODUCT_DETAIL_SUCCESS,
  payload: responceDetails,
})

export const getProductDetailFail = error => ({
  type: GET_PRODUCT_DETAIL_FAIL,
  payload: error,
})

export const confirmVSActionSuccess = () => ({
  type: CONFIRM_VS_ACTION_SUCCESS,
  payload: false,
})

export const confirmVSActionFail = () => ({
  type: CONFIRM_VS_ACTION_FAIL,
  payload: false,
})

export const searchProduct = imo => ({
  type: SEARCH_PRODUCT,
  imo,
})

export const searchProductSuccess = response => ({
  type: SEARCH_PRODUCT_SUCCESS,
  payload: response,
})

export const searchProductFail = error => ({
  type: SEARCH_PRODUCT_FAIL,
  payload: error,
})

export const productUnload = payload => ({
  type: PRODUCT_UNLOAD,
  payload,
})

export const productUnloadSuccess = response => ({
  type: PRODUCT_UNLOAD_SUCCESS,
  payload: response,
})

export const productUnloadFail = error => ({
  type: PRODUCT_UNLOAD_FAIL,
  payload: error,
})

export const productReInit = () => ({
  type: PRODUCT_REINIT,
  payload: true,
})
