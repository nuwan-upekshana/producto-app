export const stringfySafeObject = object => {
  var simpleObject = {}
  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue
    }
    if (typeof object[prop] == "object") {
      continue
    }
    if (typeof object[prop] == "function") {
      continue
    }
    simpleObject[prop] = object[prop]
  }
  return simpleObject // returns cleaned up JSON
}
