import { FORMCODES } from "./form-codes"

export const PERMISSIONS = [
  {
    name: "DRAFT",
    code: FORMCODES.DRAFT,
    is_granted: false,
    is_active: true,
  },
  {
    name: "RELEASE",
    code: FORMCODES.RELEASE,
    is_granted: false,
    is_active: true,
  },
  {
    name: "ARCHIVE",
    code: FORMCODES.ARCHIVE,
    is_granted: false,
    is_active: true,
  },
  {
    name: "VIEW",
    code: FORMCODES.VIEW,
    is_granted: false,
    is_active: true,
  },
  {
    name: "NEW",
    code: FORMCODES.NEW,
    is_granted: false,
  },
  {
    name: "HOLD",
    code: FORMCODES.HOLD,
    is_granted: false,
    is_active: false,
  },
  {
    name: "REVERSE",
    code: FORMCODES.REVERSE,
    is_granted: false,
    is_active: false,
  },
  {
    name: "EXPORT",
    code: FORMCODES.EXPORT,
    is_granted: false,
    is_active: true,
  },
  {
    name: "EDIT",
    code: FORMCODES.EDIT,
    is_granted: false,
    is_active: true,
  },
]
