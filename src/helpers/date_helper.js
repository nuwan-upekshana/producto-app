import * as moment from "moment"

export const getDate = () => {
  const date1 = moment(new Date()).format("DD MMM Y")
  return date1
}

export const getISODateTime = () => {
  let dt = new Date().toISOString()
  return dt.toString()
}

/**
 * Convert ISO date to local date and time
 * @param {*} isoDate
 * @param {*} format [ LT 4:59 PM ] [ LTS 4:59:47 PM ] [ L 12/08/2020 ] [ l 12/8/2020 ] [ LL December 8, 2020 ] [ ll Dec 8, 2020 ] [ LLL December 8, 2020 4:59 PM ] [ lll Dec 8, 2020 4:59 PM ] [ LLLL Tuesday, December 8, 2020 4:59 PM ] [ llll Tue, Dec 8, 2020 4:59 PM]
 * @returns {string} Converted date  Dec 8, 2020 4:59 PM
 */
export const convertISOtoLocalDateTime = (isoDate, format = "lll") => {
  let dt = moment(isoDate).format(format)
  return dt
}

export const getBlDate = isoDate => {
  return moment(isoDate).format("DDMMYYYY")
}

export const formatLocalDateTime = (date, format = "lll") => {
  let dt = moment(date).format(format)
  return dt
}

export const isInDateRange = (startDate, endDate, compareDate) => {
  const compareDateMO = moment(compareDate)
  const startDateMO = moment(startDate)
  const endDateMO = moment(endDate)
  return compareDateMO.isBetween(startDateMO, endDateMO)
}

export const diffInHours = (dateFrom, dateTo) => {
  const startDateMO = moment(dateFrom)
  const endDateMO = moment(dateTo)
  let minutes = endDateMO.diff(startDateMO, "minutes")
  let h = Math.floor(minutes / 60)
  let m = minutes % 60
  h = h < 10 ? "0" + h : h
  m = m < 10 ? "0" + m : m
  return h + " h : " + m + " m"
}

export const diffInDays = (dateFrom, dateTo) => {
  const startDateMO = moment(dateFrom)
  const endDateMO = moment(dateTo)
  let days = endDateMO.diff(startDateMO, "days")
  return days + 1
}

export const diffInDaysHoursMin = (dateFrom, dateTo) => {
  const startDateMO = moment(dateFrom)
  const endDateMO = moment(dateTo)
  let minutes = endDateMO.diff(startDateMO, "minutes")
  let d = Math.floor(minutes / (60 * 24))
  let h = Math.floor(minutes % (60 * 24) / 60)
  let m = ((minutes % (60 * 24) / 60) - h) * 60
  d = d < 10 ? "0" + d : d
  h = h < 10 ? "0" + h : h
  m = m < 10 ? "0" + m : m
  return d + " d : " + h + " h : " + m + " m"
}

export const addDates = (date, add) => {
  return moment(date).add(add, "days").toISOString()
}
