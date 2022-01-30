import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { string } from "prop-types"

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"

// import images
import stopcycle from "../../assets/images/vums/stop-circle.svg"
import unload from "../../assets/images/vums/unload.svg"
import refresh from "../../assets/images/vums/refresh.svg"
import archive from "../../assets/images/vums/icons/archive.svg"

const DetailPageTitle = props => {
  const [socialDrp, setsocialDrp] = useState(false)
  const icon = "label-icon me-1 bx bxs-" + props.icon

  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box page-details-title-box--vums d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-0 font-size-18">{props.title}</h4>
          <div className="page-title-right">
            {/* <ol className="breadcrumb m-0">
              <BreadcrumbItem>
                <Link to="#">{props.title}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <Link to="#">{props.breadcrumbItem}</Link>
              </BreadcrumbItem>
            </ol> */}

            <div className="btn-group btn-group-vums mb-3" role="group">
              <button
                type="button"
                className={
                  props.draftAllow
                    ? "btn btn-outline-primary w-sm"
                    : "btn btn-outline-primary w-sm disabled"
                }
              >
                Draft
              </button>
              <button
                type="button"
                className={
                  props.releaseAllow
                    ? "btn btn-outline-primary w-sm"
                    : "btn btn-outline-primary w-sm disabled"
                }
              >
                Release
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
                  <div className="px-lg-2">
                    <Row className="no-gutters">
                      <Col>
                        <div className="dropdown-icon-item detail-action-icon cursor-pointer">
                          <img src={unload} alt="unload" />
                          <span>Unload</span>
                        </div>
                      </Col>
                      <Col>
                        <div className="dropdown-icon-item detail-action-icon cursor-pointer">
                          <img src={stopcycle} alt="bitbucket" />
                          <span>Complete</span>
                        </div>
                      </Col>
                      <Col>
                        <div className="dropdown-icon-item detail-action-icon cursor-pointer">
                          <img src={refresh} alt="refresh" />
                          <span>Refresh</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </DropdownMenu>
              </Dropdown>
            </div>

            {/* <Button
              type="button"
              color="primary"
              className="btn-label"
              onClick={props.onClick}
            >
              <i className={icon}></i> {props.breadcrumbItem}
            </Button> */}
          </div>
        </div>
      </Col>
    </Row>
  )
}

DetailPageTitle.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  icon: string,
  draftAllow: PropTypes.bool,
  releaseAllow: PropTypes.bool,
}

export default DetailPageTitle
