import axios from "axios"
import { del, get, post, put } from "../api_helper"
import * as url from "./backend_url.helper"

export const postJwtLogin = data => post(url.POST_JWT_LOGIN, data)

/** Products */

// get Products
export const getProducts = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.PRODUCT, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// // get Product details
export const getProductDetails = id =>
  get(`${url.PRODUCT}/${id}`, { params: { id } })

// add Product
export const addNewProduct = port => post(url.PRODUCT, port)

// update Product
export const updateProduct = (port, id) =>
  put(`${url.PRODUCT}/${id}`, port, { params: { id } })

// delete Product
export const deleteProduct = id => del(url.PRODUCT, { params: { id } })
