import { PROFILE_IMG } from "constants/profile-imgs"
import Joi from "joi-browser"
export const USER_SCHEMA = {
  id: Joi.optional().allow(0).label("Id"),
  tenant_id: Joi.optional().allow(0).label("Tenant Id"),
  doc_id: Joi.optional().allow("").label("Document Id"),
  doc_no: Joi.optional().allow(0).label("Document No"),
  org_id: Joi.optional().allow(0).label("Org Id"),
  ref_doc_id: Joi.optional().allow(0).label("Ref Document Id"),
  doc_date: Joi.optional().allow("").label("Document date"),
  due_date: Joi.optional().allow("").label("Due date"),

  code: Joi.optional().allow("").label("Code"),

  application: Joi.optional().allow(0).label("Application"),

  doc_status: Joi.number().greater(1000).label("Document Status"),

  first_name: Joi.string().required().label("First Name"),
  last_name: Joi.string().required().label("Last Name"),
  display_name: Joi.string().required().label("Dispaly Name"),
  username: Joi.string().required().label("Username"),
  password: Joi.optional().allow("").label("Password"),
  confirm_password: Joi.optional().allow("").label("Confirm Password"),
  email: Joi.string().required().label("Email"),
  token: Joi.optional().allow("").label("Token"),
  access_token: Joi.optional().allow("").label("Access Token"),
  title: Joi.optional().allow("").label("Title"),
  nic: Joi.optional().allow("").label("NIC"),
  dob: Joi.string().required().label("DOB"),
  gender: Joi.string().required().label("Gender"),
  status: Joi.string().required().label("Status"),

  marital_status: Joi.optional().allow("").label("Marital Status"),
  phone: Joi.optional().allow("").label("Phone"),
  mobile_no: Joi.string().required().label("Mobile No"),
  address: Joi.string().required().label("Address"),
  image: Joi.string().required().label("Image"),
  group: Joi.optional().allow("").label("Group"),
  roles: Joi.optional().allow([]).label("Role"),
  refresh_token: Joi.optional().allow("").label("Refresh Token"),
  location_info: Joi.optional().allow("").label("Location Info"),
  reset_key: Joi.optional().allow("").label("Reset Key"),
  remark: Joi.optional().allow("").label("Remark"),
  last_update: Joi.optional().allow("").label("Last update date"),
}

class User {
  id = 0
  tenant_id = 0
  doc_id = ""
  doc_no = 0
  org_id = 0
  ref_doc_id = 0
  doc_date = ""
  due_date = ""
  code = ""

  application = 0

  doc_status = 1014

  first_name = ""
  last_name = ""
  display_name = ""
  username = ""
  password = ""
  confirm_password = ""
  email = ""
  token = ""
  access_token = ""
  title = ""
  nic = ""
  dob = ""
  gender = ""
  marital_status = ""
  phone = ""
  mobile_no = ""
  address = ""
  image = PROFILE_IMG[0].code
  group = ""
  roles = []
  refresh_token = ""
  location_info = ""
  reset_key = ""
  remark = ""
  status = ""
  last_update = ""
}

export default User
