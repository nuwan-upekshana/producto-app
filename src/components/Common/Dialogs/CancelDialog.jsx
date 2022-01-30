import React from "react"
import PropTypes from "prop-types"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"

const CancelDialog = ({ show, onConfirm, message }) => {
  return show ? (
    <SweetAlert error title={message.title} onConfirm={() => onConfirm()}>
      {message.message}.
    </SweetAlert>
  ) : null
}

CancelDialog.propTypes = {
  show: PropTypes.bool,
  onConfirm: PropTypes.func,
  message: PropTypes.object,
}

export default CancelDialog
