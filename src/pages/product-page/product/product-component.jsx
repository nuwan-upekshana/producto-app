import React, { Fragment, useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"

//i18n
import { withTranslation } from "react-i18next"

import "../datatables.scss"

import { handleFilters } from "helpers"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Badge,
  UncontrolledTooltip,
  Spinner,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import Select from "react-select"
import DOCSTATUS from "constants/doc_status"

//redux
import { useSelector, useDispatch } from "react-redux"

// Store Actions
import { getProducts as onGetProducts } from "store/actions"

import MainTitle from "./product-title-component"

import infoIcon from "../../../assets/images/vums/info.svg"

const ProductComponent = ({ match, history, t: translate }) => {
  const dispatch = useDispatch()

  const { loader } = useSelector(state => ({
    loader: state.vessels.loader,
  }))
  const { SearchBar } = Search

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isMenu, setIsMenu] = useState(false)
  const [materialOptionGroup, setMaterialOptionGroup] = useState([])
  const [vesselStatusOptionGroup, setProductStatusOptionGroup] = useState([])

  // Table
  const { paginatedResult } = useSelector(state => ({
    paginatedResult: state.vessels.paginatedResult,
  }))

  const [pageOptions, setPageOptions] = useState({
    sizePerPage: 5,
    totalSize: 0, // replace later with size(orders),
    custom: true,
    page: 1,
  })

  const selectRow = {
    mode: "checkbox",
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  const handleTableChange = (
    type,
    { filters, page, searchText, sizePerPage, sortField, sortOrder }
  ) => {
    setPageOptions({ ...pageOptions, sizePerPage: sizePerPage })
    if (type == "search") {
      setSearchOptions({ ...searchQuary, searchText: searchText })
      dispatch(
        onGetProducts(
          pageOptions.page,
          pageOptions.sizePerPage,
          {
            ...searchQuary,
            searchText: searchText,
          },
          filterQuary
        )
      )
    } else {
      dispatch(
        onGetProducts(
          pageOptions.page,
          pageOptions.sizePerPage,
          searchQuary,
          filterQuary
        )
      )
    }
  }

  // Search
  const [searchQuary, setSearchOptions] = useState({
    coloumns: ["name", "vessel_id"],
    searchText: "",
  })

  // Filter
  const [filterQuary, setFilters] = useState([])
  const [selectedDocStatus, setSelectedDocStatus] = useState({
    label: "Any",
    coloumn: "DocStatus",
    value: 0,
  })
  const [selectedMaterial, setselectedMaterial] = useState({
    label: "Any",
    coloumn: "assigned_material",
    value: 0,
  })
  const [selectedProductStatus, setselectedProductStatus] = useState({
    label: "Any",
    coloumn: "current_status",
    value: 0,
  })

  const handleFilterDocStatus = selectedDocStatus => {
    setSelectedDocStatus(selectedDocStatus)
    handleFilters(selectedDocStatus, setFilters, filterQuary)
  }

  const handleFilterMaterial = selectedMaterial => {
    ////debugger
    setselectedMaterial(selectedMaterial)
    handleFilters(selectedMaterial, setFilters, filterQuary)
  }

  const handleFilterProductStatus = selected => {
    setselectedProductStatus(selected)
    handleFilters(selected, setFilters, filterQuary)
  }

  const handleApplyFilter = () => {
    ////debugger
    dispatch(
      onGetProducts(
        pageOptions.page,
        pageOptions.sizePerPage,
        searchQuary,
        filterQuary
      )
    )
  }

  const handleClearFilters = () => {
    setFilters([])
    setselectedMaterial({
      label: "Any",
      coloumn: "assigned_material",
      value: 0,
    })
    setSelectedDocStatus({
      label: "Any",
      coloumn: "DocStatus",
      value: 0,
    })
    setselectedProductStatus({
      label: "Any",
      coloumn: "current_status",
      value: 0,
    })
    dispatch(
      onGetProducts(pageOptions.page, pageOptions.sizePerPage, searchQuary, [])
    )
  }

  // Utils
  const toggleMenu = () => {
    setIsMenu(!isMenu)
  }
  const toggle = () => {
    setModal(!modal)
  }

  // Effects

  useEffect(() => {
    if (paginatedResult.results && paginatedResult.results.length) {
    }
    setPageOptions({ ...pageOptions, totalSize: paginatedResult.totalPages })
  }, [paginatedResult])

  // Coloumns Config
  const productColumns = () => [
    // {
    //   dataField: "id",
    //   text: "",
    //   sort: true,
    //   formatter: (cellContent, row) => (
    //     <Fragment>
    //       {DOCSTATUS.find(docs => docs.value == row.doc_status).icon}

    //       <UncontrolledTooltip
    //         placement="top"
    //         target={DOCSTATUS.find(docs => docs.value == row.doc_status).label}
    //       >
    //         {DOCSTATUS.find(docs => docs.value == row.doc_status).label}
    //       </UncontrolledTooltip>
    //     </Fragment>
    //   ),
    // },
    {
      dataField: "id",
      text: "Product ID",
      sort: true,
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {row.id}
        </Link>
      ),
      search: true,
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      search: true,
    },
    {
      dataField: "model",
      text: "Model",
      sort: true,
    },
    {
      dataField: "brand",
      text: "Brand",
      sort: true,
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Action",
      formatter: (cellContent, data) => (
        <>
          <div className="d-flex gap-3">
            <Link
              to="#"
              className="text-success"
              onClick={() => routeToViewProductDetail(data)}
            >
              <i className="bx bx-disc font-size-20" id="viewtooltip" />
              <UncontrolledTooltip placement="top" target="viewtooltip">
                View
              </UncontrolledTooltip>
            </Link>
            <Link
              to="#"
              className="text-success"
              onClick={() => routeToEditProductDetail(data)}
            >
              <i className="bx bx-edit font-size-20" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Edit
              </UncontrolledTooltip>
            </Link>
          </div>
        </>
      ),
    },
  ]

  //Events

  //Render Action Pane
  const renderActionPane = () => {
    return (
      <Row className="no-gutters">
        <Col onClick={() => {}}>
          <div className="dropdown-icon-item detail-action-icon cursor-pointer">
            <img src={infoIcon} alt="infoIcon" />
            <span>Help</span>
          </div>
        </Col>
        <Col onClick={() => {}}>
          <div className="dropdown-icon-item detail-action-icon cursor-pointer">
            {/* <img src={unloadIcon} alt="unloadIcon" />
            <span>Unload</span> */}
          </div>
        </Col>
        <Col onClick={() => {}}>
          <div className="dropdown-icon-item detail-action-icon cursor-pointer">
            {/* <img src={locationIcon} alt="locationIcon" />
            <span>Location</span> */}
          </div>
        </Col>
      </Row>
    )
  }

  const handleOrderClick = arg => {
    const order = arg

    setOrderList({
      id: order.id,
      orderId: order.orderId,
      billingName: order.billingName,
      orderdate: order.orderdate,
      total: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      badgeclass: order.badgeclass,
    })

    setIsEdit(true)

    toggle()
  }

  //Routing
  const routeToNewProductDetail = () => {
    history.push("/product-detail/new")
  }
  const routeToEditProductDetail = product => {
    history.push(`/product-detail/edit/${product.id}`)
  }

  const routeToViewProductDetail = product => {
    history.push(`/product-detail/view/${product.id}`)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Product | productO - Product Information System</title>
        </MetaTags>
        <Container fluid>
          <MainTitle
            title="Product Information"
            breadcrumbItem="New Product"
            icon="ship"
            onClick={() => routeToNewProductDetail()}
            renderActionPane={() => renderActionPane()}
          />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody className="pb-0 card-min-height">
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={productColumns()}
                    data={paginatedResult.results}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={paginatedResult.results}
                        columns={productColumns()}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="">
                              <Col sm="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar
                                      className="vessel__search-box"
                                      {...toolkitProps.searchProps}
                                    />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              <Col>
                                <ul className="list-inline user-chat-nav text-end mb-0">
                                  {loader && (
                                    <li className="list-inline-item d-none d-sm-inline-block">
                                      <i className="btn nav-btn p-0">
                                        <Spinner
                                          className="ms-2"
                                          color="primary"
                                        />
                                      </i>
                                    </li>
                                  )}
                                  <li className="list-inline-item d-none d-sm-inline-block">
                                    <Dropdown
                                      className="btn-transparent"
                                      isOpen={isMenu}
                                      toggle={toggleMenu}
                                    >
                                      <DropdownToggle
                                        type="button"
                                        tag="button"
                                        className="btn btn-light"
                                      >
                                        <i className="bx bx-slider-alt me-1" />
                                        <Badge className="bg-success filter-badge ms-1">
                                          {filterQuary.length}
                                        </Badge>
                                      </DropdownToggle>
                                      <DropdownMenu className="dropdown-menu-lg dropdown-menu-end dropdown-menu-md">
                                        <div className="p-2">
                                          <Row className="align-items-center">
                                            <Col>
                                              <h6 className="m-0 font-weight-600">
                                                Filters
                                              </h6>
                                            </Col>
                                            <div className="col-auto">
                                              <Button
                                                type="button"
                                                color="primary"
                                                className="btn-label btn-sm"
                                                onClick={handleClearFilters}
                                              >
                                                <i className="label-icon me-1 bx bxs-eraser"></i>
                                                Clear
                                              </Button>
                                            </div>
                                          </Row>
                                        </div>

                                        <DropdownItem divider />

                                        <div className="p-2">
                                          <Row className="align-items-center">
                                            <Col md={5}>Material</Col>
                                            <Col>
                                              <Select
                                                value={selectedMaterial}
                                                onChange={option => {
                                                  handleFilterMaterial(option)
                                                }}
                                                options={[
                                                  {
                                                    label: "Any",
                                                    value: 0,
                                                    coloumn:
                                                      "assigned_material",
                                                  },
                                                  ...materialOptionGroup,
                                                ]}
                                                classNamePrefix="select2-selection"
                                              />
                                            </Col>
                                          </Row>
                                        </div>

                                        <div className="p-2">
                                          <Row className="align-items-center">
                                            <Col md={5}>Status</Col>
                                            <Col>
                                              <Select
                                                value={selectedProductStatus}
                                                onChange={option => {
                                                  handleFilterProductStatus(
                                                    option
                                                  )
                                                }}
                                                options={[
                                                  {
                                                    label: "Any",
                                                    value: 0,
                                                    coloumn: "current_status",
                                                  },
                                                  ...vesselStatusOptionGroup,
                                                ]}
                                                classNamePrefix="select2-selection"
                                              />
                                            </Col>
                                          </Row>
                                        </div>
                                        <div className="p-2">
                                          <Row className="align-items-center">
                                            <Col md={5}>Doc Status</Col>
                                            <Col>
                                              <Select
                                                value={selectedDocStatus}
                                                onChange={option => {
                                                  handleFilterDocStatus(option)
                                                }}
                                                options={[
                                                  {
                                                    label: "Any",
                                                    value: "0",
                                                    coloumn: "docStatus",
                                                  },
                                                  ...DOCSTATUS.filter(
                                                    st => st.show == true
                                                  ),
                                                ]}
                                                classNamePrefix="select2-selection"
                                              />
                                            </Col>
                                          </Row>
                                        </div>

                                        <DropdownItem divider />
                                        <div className="p-2">
                                          <Row className="align-items-center">
                                            <Col></Col>
                                            <div className="col-auto">
                                              <Button
                                                type="button"
                                                color="primary"
                                                className="btn-label btn-sm"
                                                onClick={handleApplyFilter}
                                              >
                                                <i className="label-icon me-1 bx bx-filter-alt"></i>
                                                Apply Filters
                                              </Button>
                                            </div>
                                          </Row>
                                        </div>
                                      </DropdownMenu>
                                    </Dropdown>
                                  </li>
                                </ul>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField="id"
                                    noDataIndication={() =>
                                      loader ? (
                                        <div>Loading...</div>
                                      ) : (
                                        <div>No Products available</div>
                                      )
                                    }
                                    responsive
                                    remote
                                    onTableChange={handleTableChange}
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    selectRow={selectRow}
                                    classes={
                                      "table align-middle table-nowrap table-check"
                                    }
                                    headerWrapperClasses={"table-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="inner-custom-pagination d-flex">
                                <div className="d-inline">
                                  <SizePerPageDropdownStandalone
                                    {...paginationProps}
                                  />
                                </div>
                                <div className="text-md-right ms-auto">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ProductComponent.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(ProductComponent))
