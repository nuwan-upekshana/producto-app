import axios from "axios"
import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Register Method
const postFakeRegister = data => {
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data)

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data)

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data)

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data)

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data)

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data)

// postSocialLogin
export const postSocialLogin = data => post(url.SOCIAL_LOGIN, data)

// // get Products
// export const getProducts = () => get(url.GET_PRODUCTS)

// // get Product detail
// export const getProductDetail = id =>
//   get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } })

// // get Events
// export const getEvents = () => get(url.GET_EVENTS)

// // add Events
// export const addNewEvent = event => post(url.ADD_NEW_EVENT, event)

// // update Event
// export const updateEvent = event => put(url.UPDATE_EVENT, event)

// // delete Event
// export const deleteEvent = event =>
//   del(url.DELETE_EVENT, { headers: { event } })

// // get Categories
// export const getCategories = () => get(url.GET_CATEGORIES)

// // get chats
// export const getChats = () => get(url.GET_CHATS)

// // get groups
// export const getGroups = () => get(url.GET_GROUPS)

// // get Contacts
// export const getContacts = () => get(url.GET_CONTACTS)

// // get messages
// export const getMessages = (roomId = "") =>
//   get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } })

// // get orders
// export const getOrders = () => get(url.GET_ORDERS)

// // add order
// export const addNewOrder = order => post(url.ADD_NEW_ORDER, order)

// // update order
// export const updateOrder = order => put(url.UPDATE_ORDER, order)

// // delete order
// export const deleteOrder = order =>
//   del(url.DELETE_ORDER, { headers: { order } })

// // get cart data
// export const getCartData = () => get(url.GET_CART_DATA)

// // get customers
// export const getCustomers = () => get(url.GET_CUSTOMERS)

// // add CUSTOMER
// export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer)

// // update CUSTOMER
// export const updateCustomer = customer => put(url.UPDATE_CUSTOMER, customer)

// // delete CUSTOMER
// export const deleteCustomer = customer =>
//   del(url.DELETE_CUSTOMER, { headers: { customer } })

// // get shops
// export const getShops = () => get(url.GET_SHOPS)

// // get wallet
// export const getWallet = () => get(url.GET_WALLET)

// // get crypto order
// export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS)

// // get invoices
// export const getInvoices = () => get(url.GET_INVOICES)

// // get invoice details
// export const getInvoiceDetail = id =>
//   get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } })

// // get project
// export const getProjects = () => get(url.GET_PROJECTS)

// // get project details
// export const getProjectsDetails = id =>
//   get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } })

// // get tasks
// export const getTasks = () => get(url.GET_TASKS)

// // get contacts
// export const getUsers = () => get(url.GET_USERS)

// // add user
// export const addNewUser = user => post(url.ADD_NEW_USER, user)

// // update user
// export const updateUser = user => put(url.UPDATE_USER, user)

// // delete user
// export const deleteUser = user => del(url.DELETE_USER, { headers: { user } })

// /** PROJECT */
// // add user
// export const addNewProject = project => post(url.ADD_NEW_PROJECT, project)

// // update user
// export const updateProject = project => put(url.UPDATE_PROJECT, project)

// // delete user
// export const deleteProject = project =>
//   del(url.DELETE_PROJECT, { headers: { project } })

// export const getUserProfile = () => get(url.GET_USER_PROFILE)

// // get inboxmail
// export const getInboxMails = () => get(url.GET_INBOX_MAILS)

// // add inboxmail
// export const addNewInboxMail = inboxmail =>
//   post(url.ADD_NEW_INBOX_MAIL, inboxmail)

// // delete inboxmail
// export const deleteInboxMail = inboxmail =>
//   del(url.DELETE_INBOX_MAIL, { headers: { inboxmail } })

// // get starredmail
// export const getStarredMails = () => get(url.GET_STARRED_MAILS)

// // get importantmail
// export const getImportantMails = () => get(url.GET_IMPORTANT_MAILS)

// // get sent mail
// export const getSentMails = () => get(url.GET_SENT_MAILS)

// // get trash mail
// export const getTrashMails = () => get(url.GET_TRASH_MAILS)

// // get starredmail
// export const getDraftMails = () => get(url.GET_DRAFT_MAILS)

// // get dashboard charts data
// export const getWeeklyData = () => get(url.GET_WEEKLY_DATA)
// export const getYearlyData = () => get(url.GET_YEARLY_DATA)
// export const getMonthlyData = () => get(url.GET_MONTHLY_DATA)

// export const topSellingData = month =>
//   get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } })

// export const getEarningChartsData = month =>
//   get(`${url.GET_EARNING_DATA}/${month}`, { params: { month } })

// const getProductComents = () => get(url.GET_PRODUCT_COMMENTS)

// const onLikeComment = (commentId, productId) => {
//   return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}`, {
//     params: { commentId, productId },
//   })
// }
// const onLikeReply = (commentId, productId, replyId) => {
//   return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}/${replyId}`, {
//     params: { commentId, productId, replyId },
//   })
// }

// const onAddReply = (commentId, productId, replyText) => {
//   return post(`${url.ON_ADD_REPLY}/${productId}/${commentId}`, {
//     params: { commentId, productId, replyText },
//   })
// }

// const onAddComment = (productId, commentText) => {
//   return post(`${url.ON_ADD_COMMENT}/${productId}`, {
//     params: { productId, commentText },
//   })
// }

/** VESSEL */

// get Vessel
export const getVessels = (page, sizePerPage, searchQuary, filterQuary) => {
  return get(url.GET_VESSEL, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
    },
  })
}

// get Vessels details
export const searchVessel = imo =>
  get(`${url.SEARCH_VESSEL}/${imo}`, { params: { imo } })

// get Vessels details
export const getVesselDetails = id =>
  get(`${url.GET_VESSEL_DETAIL}/${id}`, { params: { id } })

// add vessel
export const addNewVessel = project => post(url.ADD_NEW_VESSEL, project)

// update vessel
export const updateVessel = project => put(url.UPDATE_VESSEL, project)

// delete vessel
export const deleteVessel = project =>
  del(url.DELETE_VESSEL, { headers: { project } })

// unload vessel
export const vesselUnload = unload => post(url.UNLOAD_VESSEL, unload)


/** Material */

// get Materials
export const getMaterials = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_MATERIAL, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// get Material details
export const getMaterialDetails = id =>
  get(`${url.GET_MATERIAL_DETAIL}/${id}`, { params: { id } })

// add Material
export const addNewMaterial = material => post(url.ADD_NEW_MATERIAL, material)

// update Material
export const updateMaterial = material => put(url.UPDATE_MATERIAL, material)

// delete Material
export const deleteMaterial = material =>
  del(url.DELETE_MATERIAL, { headers: { material } })

/** Ports */

// get Ports
export const getPorts = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_PORT, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// get Port details
export const getPortDetails = id =>
  get(`${url.GET_PORT_DETAIL}/${id}`, { params: { id } })

// add Port
export const addNewPort = material => post(url.ADD_NEW_PORT, material)

// update Port
export const updatePort = material => put(url.UPDATE_PORT, material)

// delete Port
export const deletePort = material =>
  del(url.DELETE_PORT, { headers: { material } })

/** UnloadingMethods */

// get UnloadingMethods
export const getUnloadingMethods = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_UNLOADINGMETHOD, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// get UnloadingMethod details
export const getUnloadingMethodDetails = id =>
  get(`${url.GET_UNLOADINGMETHOD_DETAIL}/${id}`, { params: { id } })

// add UnloadingMethod
export const addNewUnloadingMethod = material =>
  post(url.ADD_NEW_UNLOADINGMETHOD, material)

// update UnloadingMethod
export const updateUnloadingMethod = material =>
  put(url.UPDATE_UNLOADINGMETHOD, material)

// delete UnloadingMethod
export const deleteUnloadingMethod = material =>
  del(url.DELETE_UNLOADINGMETHOD, { headers: { material } })

/** UnloadingType */

// get UnloadingType
export const getUnloadingTypes = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_UNLOADINGTYPE, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// get UnloadingType details
export const getUnloadingTypeDetails = id =>
  get(`${url.GET_UNLOADINGTYPE_DETAIL}/${id}`, { params: { id } })

// add UnloadingType
export const addNewUnloadingType = unloadingtype =>
  post(url.ADD_NEW_UNLOADINGTYPE, unloadingtype)

// update UnloadingType
export const updateUnloadingType = unloadingtype =>
  put(url.UPDATE_UNLOADINGTYPE, unloadingtype)

// delete UnloadingType
export const deleteUnloadingType = unloadingtype =>
  del(url.DELETE_UNLOADINGTYPE, { headers: { unloadingtype } })

export const getUnloadingMethodsByType = id =>
  get(`${url.GET_UNLOADINGMETHODS_BY_TYPE}/${id}`, { params: { id } })

/** Vessel Status */

// get Vessel State
export const getVesselStatues = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_VESSELSTATUES, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// get Vessel State
export const getVesselStateDetails = id =>
  get(`${url.GET_VESSELSTATE_DETAIL}/${id}`, { params: { id } })

// add Vessel State
export const addNewVesselState = vesselstatues =>
  post(url.ADD_NEW_VESSELSTATE, vesselstatues)

// update Vessel State
export const updateVesselState = vesselstatues =>
  put(url.UPDATE_VESSELSTATE, vesselstatues)

// delete Vessel State
export const deleteVesselState = vesselstatues =>
  del(url.DELETE_VESSELSTATE, { headers: { vesselstatues } })

/** Vehicle */

// get Vehicle
export const getVehicles = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_VEHICLES, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// get Vehicle
export const getVehicleDetails = id =>
  get(`${url.GET_VEHICLE_DETAIL}/${id}`, { params: { id } })

// add Vehicle
export const addNewVehicle = flg => post(url.ADD_NEW_VEHICLE, flg)

// update Vehicle
export const updateVehicle = flg => put(url.UPDATE_VEHICLE, flg)

// delete Vehicle
export const deleteVehicle = flg =>
  del(url.DELETE_VEHICLE, { headers: { flg } })

/** Fleet */

// get Fleet
export const getFleets = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_FLEETS, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// get Fleet
export const getFleetDetails = id =>
  get(`${url.GET_FLEET_DETAIL}/${id}`, { params: { id } })

// add Fleet
export const addNewFleet = flg => post(url.ADD_NEW_FLEET, flg)

// update Fleet
export const updateFleet = flg => put(url.UPDATE_FLEET, flg)

// delete Fleet
export const deleteFleet = flg => del(url.DELETE_FLEET, { headers: { flg } })

/** Incident */

// get Incident
export const getIncidents = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_INCIDENTS, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// get Incident
export const getIncidentDetails = id =>
  get(`${url.GET_INCIDENT_DETAIL}/${id}`, { params: { id } })

// add Incident
export const addNewIncident = flg => post(url.ADD_NEW_INCIDENT, flg)

// update Incident
export const updateIncident = flg => put(url.UPDATE_INCIDENT, flg)

// delete Incident
export const deleteIncident = flg =>
  del(url.DELETE_INCIDENT, { headers: { flg } })

// get Plants
export const getPlants = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_PLANTS, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// get Plant
export const getPlantDetails = id =>
  get(`${url.GET_PLANT_DETAIL}/${id}`, { params: { id } })

// add Plant
export const addNewPlant = flg => post(url.ADD_NEW_PLANT, flg)

// update Plant
export const updatePlant = flg => put(url.UPDATE_PLANT, flg)

// delete Plant
export const deletePlant = flg => del(url.DELETE_PLANT, { headers: { flg } })

// StockSummary
export const getPlantStockSummary = (plant, dateRange) =>
  get(`${url.GET_PLANT_STOCK_SUMMARY}/${plant}/dates`, {
    params: { plant, dateRange },
  })

// get Transfers
export const getTransfers = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_TRANSFERS, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// get Transfer
export const getTransferDetails = id =>
  get(`${url.GET_TRANSFER_DETAIL}/${id}`, { params: { id } })

// add Transfer
export const addNewTransfer = flg => post(url.ADD_NEW_TRANSFER, flg)

// update Transfer
export const updateTransfer = flg => put(url.UPDATE_TRANSFER, flg)

// delete Transfer
export const deleteTransfer = flg =>
  del(url.DELETE_TRANSFER, { headers: { flg } })

// get Roles
export const getRoles = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_ROLES, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// get Role
export const getRoleDetails = id =>
  get(`${url.GET_ROLE_DETAIL}/${id}`, { params: { id } })

// add Role
export const addNewRole = flg => post(url.ADD_NEW_ROLE, flg)

// update Role
export const updateRole = flg => put(url.UPDATE_ROLE, flg)

// delete Role
export const deleteRole = flg => del(url.DELETE_ROLE, { headers: { flg } })

// get Users
export const getUsers = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_USERS, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// get User
export const getUserDetails = id =>
  get(`${url.GET_USER_DETAIL}/${id}`, { params: { id } })

// add User
export const addNewUser = flg => post(url.ADD_NEW_USER, flg)

// update User
export const updateUser = flg => put(url.UPDATE_USER, flg)

// delete User
export const deleteUser = flg => del(url.DELETE_USER, { headers: { flg } })

// get VesselIncidents
export const getVesselIncidents = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_VESSEL_INCIDENTS, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

export const getVesselIncidentChart = (dateRange, vessel, incidents) => {
  return get(url.GET_VESSEL_INCIDENT_CHART, {
    params: {
      dateRange: dateRange,
      vessel: vessel,
      incidents: incidents,
    },
  })
}

// get VesselIncident
export const getVesselIncidentDetail = id =>
  get(`${url.GET_VESSEL_INCIDENT_DETAIL}/${id}`, { params: { id } })

// add VesselIncident
export const addNewVesselIncident = flg =>
  post(url.ADD_NEW_VESSEL_INCIDENT, flg)

// update VesselIncident
export const updateVesselIncident = flg =>
  put(url.UPDATE_VESSEL_INCIDENT, flg)

// delete VesselIncident
export const deleteVesselIncident = flg =>
  del(url.DELETE_VESSEL_INCIDENT, { headers: { flg } })

// get VesselUnloads
export const getVesselUnloads = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_VESSEL_UNLOADS, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

export const getVesselUnloadChart = (vessel, type) => {
  return get(url.GET_VESSEL_UNLOAD_CHART, {
    params: {
      vessel: vessel,
      type: type,
    },
  })
}

// get VesselUnload
export const getVesselUnloadDetail = id =>
  get(`${url.GET_VESSEL_UNLOAD_DETAIL}/${id}`, { params: { id } })

// add VesselUnload
export const addNewVesselUnload = flg => post(url.ADD_NEW_VESSEL_UNLOAD, flg)

// update VesselUnload
export const updateVesselUnload = flg => put(url.UPDATE_VESSEL_UNLOAD, flg)

// delete VesselUnload
export const deleteVesselUnload = flg =>
  del(url.DELETE_VESSEL_UNLOAD, { headers: { flg } })

// get Timelines
export const getTimelines = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_TIMELINES, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// get Timeline
export const getTimelineDetails = id =>
  get(`${url.GET_TIMELINE_DETAIL}/${id}`, { params: { id } })

// add Timeline
export const addNewTimeline = flg => post(url.ADD_NEW_TIMELINE, flg)

// update Timeline
export const updateTimeline = flg => put(url.UPDATE_TIMELINE, flg)

// delete Timeline
export const deleteTimeline = flg =>
  del(url.DELETE_TIMELINE, { headers: { flg } })


// get Warehouses
export const getWarehouses = (
  page,
  sizePerPage,
  searchQuary,
  filterQuary,
  pagination
) => {
  return get(url.GET_WAREHOUSES, {
    params: {
      page: page,
      sizePerPage: sizePerPage,
      searchQuary: searchQuary,
      filterQuary: filterQuary,
      pagination: pagination,
    },
  })
}

// get Warehouse
export const getWarehouseDetails = id =>
  get(`${url.GET_WAREHOUSE_DETAIL}/${id}`, { params: { id } })

// add Warehouse
export const addNewWarehouse = flg => post(url.ADD_NEW_WAREHOUSE, flg)

// update Warehouse
export const updateWarehouse = flg => put(url.UPDATE_WAREHOUSE, flg)

// delete Warehouse
export const deleteWarehouse = flg => del(url.DELETE_WAREHOUSE, { headers: { flg } })

// StockSummary
export const getWarehouseStockSummary = (warehouse, dateRange) =>
  get(`${url.GET_WAREHOUSE_STOCK_SUMMARY}/${warehouse}/dates`, {
    params: { warehouse, dateRange },
  })

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
}
