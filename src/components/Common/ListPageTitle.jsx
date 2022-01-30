import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem, Button } from "reactstrap"
import { string } from "prop-types"

const PageTitle = props => {
  const icon = "label-icon me-1 bx bxs-" + props.icon
  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box page-title-box--vums d-sm-flex align-items-center justify-content-between">
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
            <Button
              type="button"
              color="primary"
              className="btn-label"
              onClick={props.onClick}
            >
              <i className={icon}></i> {props.breadcrumbItem}
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

PageTitle.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  icon: string,
}

export default PageTitle
