import TOASTTYPES from "constants/toastTypes"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

const defaultOptions = {
  positionClass: "toast-top-right",
  timeOut: 5000,
  extendedTimeOut: 1000,
  closeButton: false,
  debug: false,
  progressBar: true,
  preventDuplicates: false,
  newestOnTop: false,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
  showDuration: 300,
  hideDuration: 1000,
}

const UIToast = (message, toastType, title = "") => {
  toastr.options = defaultOptions
  if (toastType === TOASTTYPES.INFO) toastr.info(message, title)
  else if (toastType === TOASTTYPES.WARNING) toastr.warning(message, title)
  else if (toastType === TOASTTYPES.ERROR) toastr.error(message, title)
  else toastr.success(message, title)
}

export default UIToast
