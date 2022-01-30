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
      JSON.stringify(searchQuary),
      JSON.stringify(filterQuary)
    )
    yield put(getProductsSuccess(response))
  } catch (error) {
    yield put(getProductsFail(error))
  }
}

function* fetchProductDetail({ payload: productId }) {
  try {
    ////debugger
    const response = yield call(getProductDetails, productId)
    yield put(getProductDetailSuccess(response))
  } catch (error) {
    yield put(getProductDetailFail(error))
  }
}

function* onUpdateProduct({ payload: product }) {
  try {
    const response = yield call(updateProduct, product, product.id)
    console.log(response)
    yield put(updateProductSuccess(response))
  } catch (error) {
    yield put(updateProductFail(error))
  }
}

function* onDeleteProduct({ payload: product }) {
  try {
    const response = yield call(deleteProduct, product)
    yield put(deleteProductSuccess(response))
  } catch (error) {
    yield put(deleteProductFail(error))
  }
}

function* onAddNewProduct({ payload: product }) {
  try {
    const response = yield call(addNewProduct, product)
    console.log(response)
    yield put(addProductSuccess(response))
  } catch (error) {
    yield put(addProductFail(error))
  }
}

function* productsSaga() {
  yield takeEvery(GET_PRODUCTS, fetchProducts)
  yield takeEvery(GET_PRODUCT_DETAIL, fetchProductDetail)
  yield takeEvery(ADD_NEW_PRODUCT, onAddNewProduct)
  yield takeEvery(UPDATE_PRODUCT, onUpdateProduct)
  yield takeEvery(DELETE_PRODUCT, onDeleteProduct)
}

export default productsSaga
