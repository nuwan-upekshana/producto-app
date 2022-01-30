import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_PRODUCTS,
  GET_PRODUCT_DETAIL,
  ADD_NEW_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  SEARCH_PRODUCT,
  PRODUCT_UNLOAD,
  PRODUCT_INCIDENT,
} from "./actionTypes"
import {
  getProductsSuccess,
  getProductsFail,
  getProductDetailSuccess,
  getProductDetailFail,
  addProductFail,
  addProductSuccess,
  updateProductSuccess,
  updateProductFail,
  deleteProductSuccess,
  deleteProductFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getProducts,
  getProductDetails,
  addNewProduct,
  updateProduct,
  deleteProduct,
} from "helpers/backend/backend.helper"

function* fetchProducts({ page, sizePerPage, searchQuary, filterQuary }) {
  try {
    debugger
    const response = yield call(
      getProducts,
      page,
      sizePerPage,
      searchQuary,
      filterQuary
    )
    yield put(getProductsSuccess(response))
  } catch (error) {
    yield put(getProductsFail(error))
  }
}

function* fetchProductDetail({ payload: vesselId }) {
  try {
    ////debugger
    const response = yield call(getProductDetails, vesselId)
    yield put(getProductDetailSuccess(response))
  } catch (error) {
    yield put(getProductDetailFail(error))
  }
}

function* onUpdateProduct({ payload: vessel }) {
  try {
    const response = yield call(updateProduct, vessel)
    console.log(response)
    yield put(updateProductSuccess(response))
  } catch (error) {
    yield put(updateProductFail(error))
  }
}

function* onDeleteProduct({ payload: vessel }) {
  try {
    const response = yield call(deleteProduct, vessel)
    yield put(deleteProductSuccess(response))
  } catch (error) {
    yield put(deleteProductFail(error))
  }
}

function* onAddNewProduct({ payload: vessel }) {
  try {
    const response = yield call(addNewProduct, vessel)
    console.log(response)
    yield put(addProductSuccess(response))
  } catch (error) {
    yield put(addProductFail(error))
  }
}

function* vesselsSaga() {
  yield takeEvery(GET_PRODUCTS, fetchProducts)
  yield takeEvery(GET_PRODUCT_DETAIL, fetchProductDetail)
  yield takeEvery(ADD_NEW_PRODUCT, onAddNewProduct)
  yield takeEvery(UPDATE_PRODUCT, onUpdateProduct)
  yield takeEvery(DELETE_PRODUCT, onDeleteProduct)
}

export default vesselsSaga
