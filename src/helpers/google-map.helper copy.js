var map, // the map id
  mapProp, // map type
  mapZoom = 3,
  // center
  mapCenter = new google.maps.LatLng(50.645107, 11.140137),
  // points
  pointA = new google.maps.LatLng(47.5695, 7.569577), // basel airport
  pointB = new google.maps.LatLng(50.037933, 8.562152), // frankfurt airport
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

  var curvedLine = new GmapsCubicBezier(P1, pA, pB, P2, 0.01, map)
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
  getCurve(pointA, pointB, map)
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
  }

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

  return FlightLine
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
}
