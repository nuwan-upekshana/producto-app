import {
  getDistance,
  getRhumbLineBearing,
  getGreatCircleBearing,
  computeDestinationPoint,
  getLatitude,
  getLongitude,
  getCompassDirection,
} from "geolib"

export const getPointsByPath = (path, numberOfPoints) => {
  debugger
  var result = new Array(numberOfPoints),
    len = path.length,
    taken = new Array(len)
  if (numberOfPoints > len)
    throw new RangeError("getRandom: more elements taken than available")
  while (numberOfPoints--) {
    var x = Math.floor(Math.random() * len)
    result[numberOfPoints] = path[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
  // debugger
  // const lineLength = getDistance(startLocation, endLocation, 0.01)
  // const lineHeading = getGreatCircleBearing(startLocation, endLocation)

  // const distance = lineLength / (numberOfPoints + 1)
  // const path = []
  // for (var i = 0; i < numberOfPoints; i++) {
  //   if (path.length == 0) {
  //     path.push(computeDestinationPoint(startLocation, distance, lineHeading))
  //   } else {
  //     path.push(computeDestinationPoint(path[i - 1], distance, lineHeading))
  //   }
  // }
}

export const getCordinateBetweenTwoPoints = (
  startLocation,
  endLocation,
  numberOfPoints
) => {
  debugger
  const lineLength = getDistance(startLocation, endLocation, 0.01)
  const lineHeading = getGreatCircleBearing(startLocation, endLocation)

  const distance = lineLength / (numberOfPoints + 1)
  const path = []
  for (var i = 0; i < numberOfPoints; i++) {
    if (path.length == 0) {
      path.push(computeDestinationPoint(startLocation, distance, lineHeading))
    } else {
      path.push(computeDestinationPoint(path[i - 1], distance, lineHeading))
    }
  }

  return path

  // const Point = function (x, y) {
  //   this.x = x
  //   this.y = y
  // }
  // var pointA = new Point(startLocation.lat, startLocation.lng)
  // var pointB = new Point(endLocation.lat, endLocation.lng)
  // var points = new Array()

  // for (var i = 0; i < numberOfPoints; i++) {
  //   points.push(
  //     new Point(
  //       (Math.abs(pointA.x - pointB.x) / 10) * i + pointB.y,
  //       (Math.abs(pointA.y - pointB.y) / numberOfPoints) * i + pointB.y
  //     )
  //   )
  // }
  // const path = []
  // for (var i = 0; i < points.length - 1; i++) {
  //   path.push({ lat: points[i].x, lng: points[i].y })
  // }
  // return path
}

export const getCDirection = (startLocation, endLocation) => {
  return getCompassDirection(startLocation, endLocation)
}

export const getGoogleCurvePath = (startLocation, endLocation) => {
  const lineLength = getDistance(startLocation, endLocation, 0.01)
  const lineHeading = getGreatCircleBearing(startLocation, endLocation)
  const compass = getCompassDirection(startLocation, endLocation)
  let lineHeading1 = 0
  let lineHeading2 = 0
  if (lineHeading > 0) {
    lineHeading1 = lineHeading + 45 //hnage curve
    lineHeading2 = lineHeading + 135
  } else {
    lineHeading1 = lineHeading + -45
    lineHeading2 = lineHeading + -135
  }
  if (compass == "WSW") {
    lineHeading1 = lineHeading + -45
    lineHeading2 = lineHeading + -135
  }
  if (compass == "SE") {
    lineHeading1 = lineHeading + 45
    lineHeading2 = lineHeading + 135
  }
  const pA = computeDestinationPoint(
    startLocation,
    lineLength / 2,
    lineHeading1
  )
  const pB = computeDestinationPoint(endLocation, lineLength / 2, lineHeading2)
  const path = GmapsCubicBezier(startLocation, pA, pB, endLocation, 0.001)
  return path
}

const GmapsCubicBezier = (
  latlong1,
  latlong2,
  latlong3,
  latlong4,
  resolution
) => {
  const lat1 = getLatitude(latlong1, false)
  const long1 = getLongitude(latlong1, false)
  const lat2 = getLatitude(latlong2, false)
  const long2 = getLongitude(latlong2, false)
  const lat3 = getLatitude(latlong3, false)
  const long3 = getLongitude(latlong3, false)
  const lat4 = getLatitude(latlong4, false)
  const long4 = getLongitude(latlong4, false)

  const points = []
  for (var it = 0; it <= 1; it += resolution) {
    points.push(
      getBezier(
        {
          x: lat1,
          y: long1,
        },
        {
          x: lat2,
          y: long2,
        },
        {
          x: lat3,
          y: long3,
        },
        {
          x: lat4,
          y: long4,
        },
        it
      )
    )
  }
  var path = []
  for (var i = 0; i < points.length - 1; i++) {
    path.push({ lat: points[i].x, lng: points[i].y })
  }
  return path
}

const getBezier = (C1, C2, C3, C4, percent) => {
  var pos = {}
  pos.x =
    C1.x * B1(percent) +
    C2.x * B2(percent) +
    C3.x * B3(percent) +
    C4.x * B4(percent)
  pos.y =
    C1.y * B1(percent) +
    C2.y * B2(percent) +
    C3.y * B3(percent) +
    C4.y * B4(percent)
  return pos
}

const B1 = t => {
  return t * t * t
}
const B2 = t => {
  return 3 * t * t * (1 - t)
}
const B3 = t => {
  return 3 * t * (1 - t) * (1 - t)
}
const B4 = t => {
  return (1 - t) * (1 - t) * (1 - t)
}
/*
var map, // the map id
  mapProp, // map type
  mapZoom = 3,
  // center
  mapCenter = new google.maps.LatLng(50.645107, 11.140137),
  // points
  pointC = new google.maps.LatLng(52.370216, 4.895168), // amsterdam
  pointD = new google.maps.LatLng(69.649205, 18.955324), // Tromsø
  // stroke options
  strokeColor = "#800000",
  strokeSize = 3,
  strokeOpacity = 0.8

function getCurve(P1, P2, map) {
  var lineLength = google.maps.geometry.spherical.computeDistanceBetween(P1, P2)
  var lineHeading = google.maps.geometry.spherical.computeHeading(P1, P2)
  if (lineHeading < 0) {
    var lineHeading1 = lineHeading + 45
    var lineHeading2 = lineHeading + 135
  } else {
    var lineHeading1 = lineHeading + -45
    var lineHeading2 = lineHeading + -135
  }
  var pA = google.maps.geometry.spherical.computeOffset(
    P1,
    lineLength / 2.2,
    lineHeading1
  )
  var pB = google.maps.geometry.spherical.computeOffset(
    P2,
    lineLength / 2.2,
    lineHeading2
  )

  var path = new GmapsCubicBezier(P1, pA, pB, P2, 0.01, map)

  var FlightLine = new google.maps.Polyline({
    path: path,
    geodesic: true,
    strokeColor: strokeColor,
    strokeOpacity: 0,
    strokeWeight: strokeSize,

    icons: [
      {
        icon: {
          path: "M 0,-1 0,1",
          strokeOpacity: strokeOpacity,
          scale: strokeSize,
        },
        offset: "0",
        repeat: "16px",
      },
    ],
  })

  FlightLine.setMap(map)
}

function initialize() {
  // define properties
  mapProp = {
    center: mapCenter,
    zoom: mapZoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  }
  // set the map
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp)
  // drawCurves
  getCurve(pointC, pointD, map)
}

google.maps.event.addDomListener(window, "load", initialize)
// original Belzier Curve code from nicoabie's answer to this question on StackOverflow:
// http://stackoverflow.com/questions/5347984/letting-users-draw-curved-lines-on-a-google-map
var GmapsCubicBezier = function (
  latlong1,
  latlong2,
  latlong3,
  latlong4,
  resolution,
  map
) {
  var lat1 = latlong1.lat()
  var long1 = latlong1.lng()
  var lat2 = latlong2.lat()
  var long2 = latlong2.lng()
  var lat3 = latlong3.lat()
  var long3 = latlong3.lng()
  var lat4 = latlong4.lat()
  var long4 = latlong4.lng()

  var points = []

  for (var it = 0; it <= 1; it += resolution) {
    points.push(
      this.getBezier(
        {
          x: lat1,
          y: long1,
        },
        {
          x: lat2,
          y: long2,
        },
        {
          x: lat3,
          y: long3,
        },
        {
          x: lat4,
          y: long4,
        },
        it
      )
    )
  }
  var path = []
  for (var i = 0; i < points.length - 1; i++) {
    path.push(new google.maps.LatLng(points[i].x, points[i].y))
    path.push(new google.maps.LatLng(points[i + 1].x, points[i + 1].y, false))
  }

  return path
}

GmapsCubicBezier.prototype = {
  B1: function (t) {
    return t * t * t
  },
  B2: function (t) {
    return 3 * t * t * (1 - t)
  },
  B3: function (t) {
    return 3 * t * (1 - t) * (1 - t)
  },
  B4: function (t) {
    return (1 - t) * (1 - t) * (1 - t)
  },
  getBezier: function (C1, C2, C3, C4, percent) {
    var pos = {}
    pos.x =
      C1.x * this.B1(percent) +
      C2.x * this.B2(percent) +
      C3.x * this.B3(percent) +
      C4.x * this.B4(percent)
    pos.y =
      C1.y * this.B1(percent) +
      C2.y * this.B2(percent) +
      C3.y * this.B3(percent) +
      C4.y * this.B4(percent)
    return pos
  },
}*/
