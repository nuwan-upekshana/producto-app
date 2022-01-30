import React, { useState } from "react"
import PropTypes from "prop-types"
// Reactstrap
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Row,
  Col,
  Spinner,
} from "reactstrap"
import { string } from "prop-types"

const VesselTitleComponent = props => {
  const [socialDrp, setsocialDrp] = useState(false)
  const icon = "label-icon me-1 bx bxs-ship" + props.icon
  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box page-title-box--vums d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-0 font-size-18 title-lower">{props.title}</h4>
          <div className="page-title-right">
            <div className="page-title-right">
              {props.loader && <Spinner className="me-3" color="primary" />}
              <div className="btn-group btn-group-vums mb-3" role="group">
                <button
                  type="button"
                  className="btn btn-outline-primary w-sm"
                  onClick={props.onClick}
                >
                  {/* <i className="label-icon me-1 bx bxs-ship"></i> */}
                  <i className="bx bxl-product-hunt font-size-20 align-middle me-2"></i>
                  New Product
                </button>
                <Dropdown
                  className="d-lg-inline-block ms-1"
                  isOpen={socialDrp}
                  toggle={() => {
                    setsocialDrp(!socialDrp)
                  }}
                >
                  <DropdownToggle
                    className="btn btn-primary noti-icon detail-title-icon"
                    tag="button"
                  >
                    <i className="bx bx-customize" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-lg dropdown-menu-end">
                    <div className="px-lg-2">{props.renderActionPane()}</div>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

VesselTitleComponent.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  icon: string,
}

export default VesselTitleComponent
