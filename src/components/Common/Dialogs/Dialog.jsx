import React from "react"
import PropTypes from "prop-types"
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"

const Dialog = ({ show, title, message, onConfirm, onCancel, action }) => {
  return show ? (
    <SweetAlert
      title={title} //"Are you sure?"
      warning
      showCancel
      confirmBtnBsStyle="success"
      cancelBtnBsStyle="danger"
      onConfirm={() => onConfirm(action)}
      onCancel={() => onCancel(action)}
    >
      {message}
      {/*You won't be able to revert this! */}
    </SweetAlert>
  ) : null
}

Dialog.propTypes = {
  show: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Dialog
