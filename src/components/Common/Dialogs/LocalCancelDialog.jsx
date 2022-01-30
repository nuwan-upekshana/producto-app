import React from "react"
import PropTypes from "prop-types"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"

const LocalCancelDialog = ({ show, onConfirm, message }) => {
  return show ? (
    <SweetAlert error title={message.title} onConfirm={() => onConfirm()}>
      {message.message}.
    </SweetAlert>
  ) : null
}

LocalCancelDialog.propTypes = {
  show: PropTypes.bool,
  onConfirm: PropTypes.func,
  message: PropTypes.object,
}

export default LocalCancelDialog
