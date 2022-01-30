export const genarateBackendErrors = data => {
  const payload = data.message
  const errorPayload = {}
  debugger
  if (typeof data.message === "string" || data.message instanceof String) {
  } else {
    payload.forEach(error => {
      errorPayload[error.property] = {
        type: Object.keys(error.constraints)[0],
        message: error.constraints[Object.keys(error.constraints)[0]],
      }
    })
  }

  return errorPayload
}
