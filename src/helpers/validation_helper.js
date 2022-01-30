import { FORMCODES } from "constants/form-codes"
import Joi from "joi-browser"

import errorMsgList from "../constants/JSON/error.json"

export const validateModel = (module, schema, data) => {
  const options = { abortEarly: false, allowUnknown: true }
  const errors = Joi.validate(data, schema, options)
  return errors.error ? buildErrorObject(errors.error.details, module) : null
}

export const validateProperty = (module, schema, porperty, data) => {
  const options = { abortEarly: false, allowUnknown: true }
  const model = { [porperty]: data }
  const porpertySchema = { [porperty]: schema[porperty] }
  const errors = Joi.validate(model, porpertySchema, options)
  return errors.error
    ? buildErrorObject(errors.error.details, module)[porperty]
    : null
}

const buildErrorObject = (errors, moduleName) => {
  const usefulErrors = {}
  console.log(errors)
  errors.map(error => {
    const { label } = error.context
    if (!usefulErrors.hasOwnProperty(error.path.join("_"))) {
      usefulErrors[error.path.join("_")] = {
        type: error.type,
        msg_code: `${moduleName}.${error.path.join("_")}.${error.type}`,
        message: getMassageBaseOnCode(
          `${moduleName}.${error.path.join("_")}.${error.type}`,
          label
        ),
      }
    }
  })
  return usefulErrors
}

const getMassageBaseOnCode = (msg_code, label) => {
  return errorMsgList[msg_code]
    ? errorMsgList[msg_code]
    : `The ${label ? label : ""} cannot be empty`
}

export const isValidateRequired = formAction => {
  if (
    formAction === FORMCODES.NEW ||
    formAction === FORMCODES.EDIT ||
    formAction === FORMCODES.DRAFT ||
    formAction == FORMCODES.UPDATE ||
    formAction == FORMCODES.RELEASE
  ) {
    return true
  } else {
    return false
  }
}
