import React from "react"
import PropTypes from "prop-types"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"

const LocalSuccessDialog = ({ show, onConfirm, message }) => {
  return show ? (
    <SweetAlert success title={message.title} onConfirm={() => onConfirm()}>
      {message.message}.
    </SweetAlert>
  ) : null
}

LocalSuccessDialog.propTypes = {
  show: PropTypes.bool,
  onConfirm: PropTypes.func,
  message: PropTypes.object,
}

export default LocalSuccessDialog
