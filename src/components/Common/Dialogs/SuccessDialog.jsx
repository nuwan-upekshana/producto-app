import React from "react"
import PropTypes from "prop-types"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"

const SuccessDialog = ({ show, onConfirm, message }) => {
  return show ? (
    <SweetAlert success title={message.title} onConfirm={() => onConfirm()}>
      {message.message}.
    </SweetAlert>
  ) : null
}

SuccessDialog.propTypes = {
  show: PropTypes.bool,
  onConfirm: PropTypes.func,
  message: PropTypes.object,
}

export default SuccessDialog
