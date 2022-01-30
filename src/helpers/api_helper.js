import axios from "axios"
import { AxiosError } from "axios"
import accessToken, { getAccessToken } from "./jwt-token-access/accessToken"

//pass new generated access token here
const token = accessToken

//apply base url for axios
const API_URL = "http://localhost:8081"

const axiosApi = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
})

axiosApi.defaults.headers.common["Authorization"] = getAccessToken()

// Add a response interceptor
axiosApi.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      return Promise.reject(error.response.data)
    } else {
      return Promise.reject({ message: error.message })
    }
    console.log(error)
  }
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return await axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return await axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
