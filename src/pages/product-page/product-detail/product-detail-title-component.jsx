import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { string } from "prop-types"

// Reactstrap
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Row,
  Col,
  Spinner,
} from "reactstrap"

const VesselDetailTitleComponent = props => {
  const [socialDrp, setsocialDrp] = useState(false)
  const icon = "label-icon me-1 bx bxs-" + props.icon

  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box page-details-title-box--vums d-sm-flex align-items-center justify-content-between">
          <h4 className="title-lower mb-0 font-size-18">{props.title}</h4>
          <div className="page-title-right">
            {props.loader && <Spinner className="me-3" color="primary" />}
            <div className="btn-group btn-group-vums mb-3" role="group">
              <button
                type="button"
                className={
                  props.draftAllow
                    ? "btn btn-outline-primary w-sm"
                    : "btn btn-outline-primary w-sm disabled"
                }
                onClick={props.onDraft}
              >
                Save
              </button>

              {props.editAllow && (
                <button
                  type="button"
                  className={
                    props.editAllow
                      ? "btn btn-outline-primary w-sm"
                      : "btn btn-outline-primary w-sm disabled"
                  }
                  onClick={props.onEdit}
                >
                  Edit
                </button>
              )}
              {props.updateAllow && (
                <button
                  type="button"
                  className="btn btn-outline-primary w-sm"
                  onClick={props.onUpdate}
                >
                  Update
                </button>
              )}

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
      </Col>
    </Row>
  )
}

VesselDetailTitleComponent.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
  icon: string,
  draftAllow: PropTypes.bool,
  releaseAllow: PropTypes.bool,
  loader: PropTypes.bool,
  onDraft: PropTypes.func,
}

export default VesselDetailTitleComponent
