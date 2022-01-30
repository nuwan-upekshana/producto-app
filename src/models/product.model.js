import Joi from "joi-browser"

export const PRODUCTSCHEMA = {
  id: Joi.optional().allow("").label("Id"),
  brand: Joi.string().required().label("Brand"),
  model: Joi.string().required().label("Model"),
  description: Joi.string().required().label("Description"),
}

class Product {
  id = ""
  model = ""
  brand = ""
  description = ""
}

export default Product
