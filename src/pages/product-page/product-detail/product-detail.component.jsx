import React, { Fragment, useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"

//redux
import { useSelector, useDispatch } from "react-redux"

//i18n
import { withTranslation } from "react-i18next"

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

import {
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Label,
  NavItem,
  NavLink,
  Progress,
  Row,
  TabContent,
  TabPane,
  Media,
  Button,
  InputGroup,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledAlert,
} from "reactstrap"

import Editable from "react-bootstrap-editable"

import classnames from "classnames"
import { Link, withRouter } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// Editable
import BootstrapTable from "react-bootstrap-table-next"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"

//Import Breadcrumb
import DetailTitle from "./product-detail-title-component"

import Select from "react-select"
import Product, { PRODUCTSCHEMA } from "models/product.model"
import {
  convertISOtoLocalDateTime,
  diffInDays,
  getBlDate as getBlDateString,
} from "helpers"

//Dialogs
import SuccessDialog from "components/Common/Dialogs/SuccessDialog"
import CancelDialog from "components/Common/Dialogs/CancelDialog"
import Dialog from "components/Common/Dialogs/Dialog"
import LocalSuccessDialog from "components/Common/Dialogs/LocalSuccessDialog"
import LocalCancelDialog from "components/Common/Dialogs/LocalCancelDialog"

// Store Actions
import {
  addNewProduct as onAddNewProduct,
  updateProduct as onUpdateProduct,
  getProductDetail as onGetProductDetail,
  confirmVSActionSuccess as onActionSuccess,
  confirmVSActionFail as onActionFail,
} from "store/actions"

import DOCSTATUS, { DOCSTATUSCODES } from "constants/doc_status"

import defaultProductImg from "assets/images/vums/icons/product.svg"
import {
  isValidateRequired,
  validateModel,
  validateProperty,
} from "helpers/validation_helper"

import { FORMCODES } from "constants/form-codes"
import { NAVIGATE_VESSEL } from "helpers/url_helper"

// import images
import stopcycle from "../../../assets/images/vums/stop-circle.svg"
import unloadIcon from "../../../assets/images/vums/unload.svg"
import arrived from "../../../assets/images/vums/arrived.svg"
import statusIcon from "../../../assets/images/vums/status.svg"
import locationIcon from "../../../assets/images/vums/location.svg"
import infoIcon from "../../../assets/images/vums/info.svg"

import { HATCH_STATUS } from "constants/hatch-status"
import { HATCH_NUMBERS } from "constants/hatch-numbers"
import { parseInt } from "lodash"

const ProductDetailComponent = ({ match, history, t: translate }) => {
  const baseModule = "vessel"
  const dispatch = useDispatch()
  const lastTab = 2
  const { document } = useSelector(state => ({
    document: state.vessels.document,
  }))

  const { loader } = useSelector(state => ({
    loader: state.vessels.loader,
  }))

  const [activeTab, setactiveTab] = useState(1)
  const [modalHatch, setHatchModal] = useState(false)
  const [modalIncident, setIncidentModal] = useState(false)
  const [modalLocation, setLocationModal] = useState(false)
  const [modalUnload, setUnloadModal] = useState(false)
  const [errors, setErrors] = useState({})
  const [activeRequestedTab, setactiveRequestedTab] = useState(1)

  const [passedSteps, setPassedSteps] = useState([1, 2, 3])
  const [localDocument, setLocalDocument] = useState(new Product())
  const [selectedProductStatus, setselectedProductStatus] = useState({
    label: "Select a status",
    value: 0,
  })

  const [selectedHatchCount, setSelectedHatchCount] = useState({
    label: "Select a hatch count",
    value: 0,
  })

  const [portOptionGroup, setportOptionGroup] = useState([])
  const [materialOptionGroup, setMaterialOptionGroup] = useState([])
  const [vesselStatusOptionGroup, setProductStatusOptionGroup] = useState([])
  const [selectedPort, setSelectedPort] = useState({
    label: "Select a port",
    value: 0,
  })
  const [selectedMaterial, setSelectedMaterial] = useState({
    label: "Select a material",
    value: 0,
  })
  const [unloadingTypeOptionGroup, setUnloadingTypeOptionGroup] = useState([])
  const [selectedUnloadingType, setSelectedUnloadingType] = useState({
    label: "Select a unloading type",
    value: 0,
  })
  const [incidentOptionGroup, setIncidentOptionGroup] = useState([])

  const [hatchList, setHatchList] = useState([])
  const [hatch, setHatch] = useState([])
  const [unloadingMethods, setUnloadingMethods] = useState([])
  const [documentValidated, setDocumentValidated] = useState(false)
  const [disableSearch, setDisableSearch] = useState(false)
  const [formAction, setFormAction] = useState(
    match.params.mode
      ? FORMCODES[match.params.mode.toUpperCase()]
      : FORMCODES.NEW
  )

  const actionRequestManager = action => {
    if (handleDocumentValidation()) {
      setFormAction(action)
    }
  }
  const [columns, setColoumns] = useState([
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "name",
      text: "Method",
      editable: false,
    },
    {
      dataField: "avg_capacity",
      text: "Capacity",
      editable: false,
    },
  ])

  //Dialog Selectors
  const [dialog, setDialog] = useState({
    show: false,
    title: "Are you sure?",
    message: "",
    action: null,
  })
  const { actionSuccess } = useSelector(state => ({
    actionSuccess: state.vessels.actionSuccess,
  }))

  const { showMessage } = useSelector(state => ({
    showMessage: state.vessels.showMessage,
  }))

  const { actionFail } = useSelector(state => ({
    actionFail: state.vessels.actionFail,
  }))
  const { message } = useSelector(state => ({
    message: state.vessels.message,
  }))

  //Local Messages
  const [localActionSuccess, setLocalActionSuccess] = useState(false)
  const [localActionFail, setLocalActionFail] = useState(false)
  const [localMessage, setLocalMessage] = useState({ title: "", message: "" })

  //Tab controll
  const toggleTab = tab => {
    if (activeTab !== tab) {
      let modifiedSteps = [...passedSteps, tab]
      if (tab >= 1 && tab <= lastTab) {
        setactiveTab(tab)
        setPassedSteps(modifiedSteps)
      }
    }
  }

  const handleactiveRequestedTab = tab => {
    setactiveRequestedTab(tab)
  }

  const handleValidTabSubmit = (e, v) => {
    if (activeRequestedTab == lastTab) {
      handleDocumentValidation()
    }
    toggleTab(activeRequestedTab)
  }

  //Events

  const handleTableEdit = (value, row, column) => {
    //////debugger
    console.log(row)
    console.log(value)
    console.log(column)
    const newUnloadMethod = [...unloadingMethods]
    const indexUnm = unloadingMethods.findIndex(unm => unm.id === row.id)
    if (indexUnm > 0) {
      newUnloadMethod[indexUnm].avg_capacity = value
      setUnloadingMethods(newUnloadMethod)
    }
  }

  const handleIncidentUpdate = payload => {
    debugger
    setIncidentModal(false)
    dispatch(onAddNewProductIncident(payload))
  }

  const handleUnloadListUpdate = payload => {
    setUnloadModal(false)
    dispatch(onProductUnload(payload))
  }

  const handleReciveBlDate = () => {
    if (localDocument.bl_date !== "") {
      return new Date(localDocument.bl_date)
    } else {
      return null
    }
  }

  const handleGetDate = prop => {
    if (prop == "arrived_on") {
      if (localDocument.arrived_on !== "") {
        return new Date(localDocument.arrived_on)
      } else {
        return null
      }
    } else if (prop == "berthed_on") {
      if (localDocument.berthed_on !== "") {
        return new Date(localDocument.berthed_on)
      } else {
        return null
      }
    } else if (prop == "commenced_discharge_on") {
      if (localDocument.commenced_discharge_on !== "") {
        return new Date(localDocument.commenced_discharge_on)
      } else {
        return null
      }
    } else if (prop == "laytime_commenced") {
      if (localDocument.laytime_commenced !== "") {
        return new Date(localDocument.laytime_commenced)
      } else {
        return null
      }
    } else if (prop == "complete_discharge_on") {
      if (localDocument.complete_discharge_on !== "") {
        return new Date(localDocument.complete_discharge_on)
      } else {
        return null
      }
    }
  }

  const handleSetDate = (date, prop) => {
    const dateISO = new Date(date[0]).toISOString()
    if (prop == "arrived_on") {
      setLocalDocument({
        ...localDocument,
        arrived_on: dateISO,
      })
    } else if (prop == "berthed_on") {
      setLocalDocument({
        ...localDocument,
        berthed_on: dateISO,
      })
    } else if (prop == "commenced_discharge_on") {
      setLocalDocument({
        ...localDocument,
        commenced_discharge_on: dateISO,
      })
    } else if (prop == "laytime_commenced") {
      setLocalDocument({
        ...localDocument,
        laytime_commenced: dateISO,
      })
    } else if (prop == "complete_discharge_on") {
      setLocalDocument({
        ...localDocument,
        complete_discharge_on: dateISO,
      })
    }
  }

  const handleBLDate = date => {
    const bl_DateISO = new Date(date[0]).toISOString()
    let vessel_id = ""
    if (localDocument.name) {
      const blDateStr = getBlDateString(bl_DateISO)
      vessel_id = localDocument.name.replace(/\s/g, "") + blDateStr
    } else {
      vessel_id = localDocument.name.replace(/\s/g, "")
    }
    setLocalDocument({
      ...localDocument,
      bl_date: bl_DateISO,
      vessel_id: vessel_id,
    })
  }

  const handleModelData = model => {
    if (model == "location") {
      return {
        vesselName: localDocument.name,
        portName: selectedPort ? selectedPort.name : "",
        vesselLocation: { lat: 24.872277, lng: 66.134282 },
        portLocation: { lat: 6.9775703, lng: 79.7906733 },
        vesselId: localDocument.id,
      }
    } else if (model == "unload") {
      return {
        hatch_list: localDocument.hatch_list,
        unloading_methods: localDocument.unloading_methods,
        vesselId: localDocument.id,
      }
    } else if (model == "incidents") {
      ////debugger
      return {
        incidentOptionGroup: incidentOptionGroup,
        vesselId: localDocument.id,
      }
    }
  }

  const handleMainTitle = () => {
    return `Product Details - #${
      localDocument.doc_id ? localDocument.doc_id : "(Auto)"
    } - (${
      DOCSTATUS.find(st => st.value == localDocument.doc_status)
        ? DOCSTATUS.find(st => st.value == localDocument.doc_status).label
        : "New"
    })`
  }

  const handleUserInput = (e, value, coloumn = null) => {
    let assignedColoumn = ""
    if (coloumn) {
      assignedColoumn = coloumn
    } else {
      assignedColoumn = e.target.name
    }
    setLocalDocument({ ...localDocument, [assignedColoumn]: value })
  }

  const handleUnloadignMethodUserInput = (e, value, coloumn = null) => {
    let assignedColoumn = ""
    const avg_capacity = parseFloat(value)
    if (coloumn) {
      assignedColoumn = coloumn
    } else {
      assignedColoumn = e.target.name
    }
    const unloadingMethodIndex = unloadingMethods.findIndex(method => {
      const currentColoumn = "avg_capacity_" + method.id
      if (currentColoumn == assignedColoumn) {
        return true
      }
      return false
    })
    if (unloadingMethodIndex !== -1) {
      const methods = [...unloadingMethods]
      methods[unloadingMethodIndex] = {
        ...methods[unloadingMethodIndex],
        avg_capacity: avg_capacity,
      }
      setUnloadingMethods(methods)
    }
  }

  function handleSelectedProductStatus(selectedGroup) {
    const vstate = vesselStateList.find(
      state => state.id == selectedGroup.value
    )
    vstate &&
      setLocalDocument({ ...localDocument, current_status: { id: vstate.id } })
    !vstate && setLocalDocument({ ...localDocument, current_status: 0 })
    setselectedProductStatus(selectedGroup)
  }

  function handleSelectedHatchCount(selectedGroup) {
    setLocalDocument({ ...localDocument, hatch_count: selectedGroup.value })
    setSelectedHatchCount(selectedGroup)
    handleHatchList(selectedGroup.value)
  }

  function handleSelectedUnlodingType(selectedGroup) {
    const unloadingType = unloadingTypesList.find(
      type => type.id == selectedGroup.value
    )
    unloadingType &&
      setLocalDocument({
        ...localDocument,
        unloading_type: { id: unloadingType.id },
      })
    unloadingType && dispatch(onGetUnloadingMethodsByType(selectedGroup.id))
    setSelectedUnloadingType(selectedGroup)
  }

  const handleProductSearch = (e, { imo }) => {}

  const handleSelectedPort = selectedPortOption => {
    const port = portList.find(port => port.id == selectedPortOption.value)
    port &&
      setLocalDocument({ ...localDocument, assigned_port: { id: port.id } })
    !port && setLocalDocument({ ...localDocument, assigned_port: 0 })
    setSelectedPort(selectedPortOption)
  }

  const handleSelectedMaterial = selectedMaterialOption => {
    const material = materialList.find(
      material => material.id == selectedMaterialOption.value
    )
    material &&
      setLocalDocument({
        ...localDocument,
        assigned_material: { id: material.id },
      })
    !material && setLocalDocument({ ...localDocument, assigned_material: 0 })
    setSelectedMaterial(selectedMaterialOption)
  }

  const handleHatchList = hatch_count => {
    // const materialQty = _.round(localDocument.bl_qty / hatch_count, 2).toFixed(
    //   2
    // )
    const hatchModel = _.range(hatch_count)
    const hatchUpdate = []

    hatchModel.forEach((val, index) => {
      let hatch = new Hatch()
      hatch.name = "Hatch " + (index + 1)
      hatch.hatch_index = index + 1
      hatch.material_qty = 0.0
      hatch.unloaded_qty = 0.0
      hatch.remaining_qty = 0.0
      hatchUpdate.push(hatch)
    })
    if (hatchUpdate) {
      setHatchList(hatchUpdate)
      //setLocalDocument({ ...localDocument, hatch_list: hatchUpdate })
    }
  }

  const handleHatchUpdate = (e, hat) => {
    //debugger
    const hatchUpdate = hatchList.map(hatchData => {
      if (hatchData.hatch_index === hat.hatch_index) {
        return {
          ...hatchData,
          unloaded_qty:
            hat.unloaded_qty == "" ? 0.0 : parseFloat(hat.unloaded_qty),
          material_qty:
            hat.material_qty == "" ? 0.0 : parseFloat(hat.material_qty),
        }
      }
      return hatchData
    })
    setHatchList(hatchUpdate)
    toggle()
  }

  //Validator
  const customeValidators = () => {
    let err = {}

    return err
  }

  const prefill = () => {
    let document = {}
    setLocalDocument({ ...localDocument, ...document })
    return { ...localDocument, ...document }
  }
  const handleDocumentValidation = () => {
    if (isValidateRequired(formAction)) {
      const document = prefill()
      const joiErr = validateModel(baseModule, PRODUCTSCHEMA, document)
      const customeErrors = customeValidators()
      const err = { ...customeErrors, ...joiErr }
      const errData = err ? err : {}
      console.log(errors)
      setErrors(errData)
      if (Object.keys(err).length > 0) {
        setDocumentValidated(false)
        return false
      } else {
        setDocumentValidated(true)
        return true
      }
    } else {
      setDocumentValidated(true)
      return true
    }
  }

  useEffect(() => {
    setLocalDocument(document)
    //debugger
    if (
      document &&
      document.hatch_count > 0 &&
      document.hatch_list.length > 0
    ) {
      setHatchList(document.hatch_list)
    } else {
      handleHatchList(document.hatch_count)
    }
    const hatchNumber = HATCH_NUMBERS.find(
      hat => hat.value === document.hatch_count
    )
    setSelectedHatchCount(hatchNumber)
  }, [document])

  useEffect(() => {
    formControler()
  }, [formAction])

  const avFieldVaildator = (value, ctx, { props }) => {
    const { name } = props
    const err = validateProperty(baseModule, PRODUCTSCHEMA, name, value)
    return err ? err["message"] : true
  }

  const toggle = () => {
    setHatchModal(!modalHatch)
  }

  //Renders
  const renderHatchStatus = status => {
    const hStatus = HATCH_STATUS.find(hat => hat.value === status)
    if (hStatus) {
      return hStatus.label
    } else {
      return "Waiting"
    }
  }

  const renderErrorList = () => {
    const errorFieldList = Object.keys(errors)
    if (errorFieldList.length == 0) {
      return null
    }
    return (
      <Col lg="6">
        {errorFieldList.map((field, index) => {
          let message = errors[field].message
          return (
            <UncontrolledAlert
              color="danger"
              className="alert-dismissible fade show"
              role="alert"
            >
              <i className="mdi mdi-block-helper me-2"></i>
              {message}
            </UncontrolledAlert>
          )
        })}
      </Col>
    )
  }

  /**
   * Action Controler for the form [Local Action]
   * @param {string} actionCode
   * @todo Check Permission and show error toast
   */
  const actionControler = actionCode => {
    if (actionCode === 9010) {
      if (localDocument.doc_status !== DOCSTATUSCODES.NEW) {
        setIncidentModal(true)
      }
    } else if (actionCode === 9011) {
      //Unload
      if (localDocument.doc_status !== DOCSTATUSCODES.NEW) {
        setUnloadModal(true)
      }
    } else if (actionCode === 9012) {
      //Locaton
      if (localDocument.doc_status !== DOCSTATUSCODES.NEW) {
        setLocationModal(true)
      }
    }
  }

  /**
   * Permission based form form action Controler [FORM] Dont call set action
   * @todo Check Permission and show error toast
   */
  const formControler = () => {
    if (formAction == FORMCODES.NEW) {
      setactiveTab(1)
      setDisableSearch(false)
      setLocalDocument(new Product())
      setColoumns([
        {
          dataField: "id",
          text: "ID",
        },
        {
          dataField: "name",
          text: "Method",
          editable: false,
        },
        {
          dataField: "avg_capacity",
          text: "Capacity",
          editable: true,
        },
      ])
    } else if (formAction == FORMCODES.VIEW) {
      if (match.params.id) {
        //////debugger
        dispatch(onGetProductDetail(match.params.id))
        setPassedSteps([1, 2, 3, 4, 5])
        setDocumentValidated(true)
      } else {
        history.push(NAVIGATE_VESSEL)
      }
    } else if (formAction == FORMCODES.DRAFT) {
      setactiveTab(1)
      if (localDocument.id) {
        dialogControler(formAction, "You are going to Update the Document")
      } else {
        const newDocument = {
          ...localDocument,
          doc_status: DOCSTATUSCODES.DRAFT,
        }
        setLocalDocument(newDocument)
        dialogControler(formAction, "You are going to Save New Document")
      }
    } else if (formAction == FORMCODES.RELEASE) {
      setactiveTab(1)
      const releasedDocument = {
        ...localDocument,
        doc_status: DOCSTATUSCODES.RELEASE,
      }
      setLocalDocument(releasedDocument)
      dialogControler(
        formAction,
        "You are going to Release " + releasedDocument.name
      )
    } else if (formAction == FORMCODES.EDIT) {
      if (match.params.id) {
        dispatch(onGetProductDetail(match.params.id))
        setPassedSteps([1, 2, 3, 4, 5])
        setDocumentValidated(true)
        setColoumns([
          {
            dataField: "id",
            text: "ID",
          },
          {
            dataField: "name",
            text: "Method",
            editable: false,
          },
          {
            dataField: "avg_capacity",
            text: "Capacity",
            editable: true,
          },
        ])
      }
    } else if (formAction == FORMCODES.UPDATE) {
      setactiveTab(1)
      if (
        localDocument.doc_status === DOCSTATUSCODES.DRAFT ||
        localDocument.doc_status === DOCSTATUSCODES.NEW
      ) {
        actionRequestManager(FORMCODES.DRAFT)
      }

      if (localDocument.doc_status === DOCSTATUSCODES.RELEASE) {
        dialogControler(formAction, "You are going to update the document")
      }
    }
  }

  // DIALOGS
  const dialogControler = (actionCode, message, title = "Are you sure?") => {
    setDialog({
      show: true,
      message: message,
      title: title,
      action: actionCode,
    })
  }

  const handleDialogOnConfirm = actionCode => {
    if (actionCode == FORMCODES.DRAFT) {
      if (localDocument.id) {
        //Update in DB
        dispatch(onUpdateProduct(localDocument))
      } else {
        //Save in DB
        console.log(localDocument)
        dispatch(onAddNewProduct(localDocument))
      }
    } else if (actionCode == FORMCODES.RELEASE) {
      //Update in DB
      dispatch(onUpdateProduct(localDocument))
    } else if (actionCode == FORMCODES.UPDATE) {
      //Update in DB
      dispatch(onUpdateProduct(localDocument))
    }
    setDialog({ ...dialog, show: false, action: null })
  }

  const handleDialogOnCancel = actionCode => {
    if (actionCode == FORMCODES.DRAFT) {
      setLocalDocument({ ...localDocument, doc_status: DOCSTATUSCODES.NEW })
      actionRequestManager(FORMCODES.DRAFT_CANCEL)
    }
    if (actionCode == FORMCODES.RELEASE) {
      setLocalDocument({ ...localDocument, doc_status: DOCSTATUSCODES.DRAFT })
      actionRequestManager(FORMCODES.RELEASE_CANCEL)
    }
    setDialog({ ...dialog, show: false, action: null })
  }

  const disableControl = field => {
    if (formAction == FORMCODES.NEW) return false
    if (formAction == FORMCODES.DRAFT) return true
    if (formAction == FORMCODES.EDIT) return false
    if (formAction == FORMCODES.DRAFT_CANCEL) return false
    if (formAction == FORMCODES.RELEASE_CANCEL) return false
    return true
  }

  //Render Action Pane
  const renderActionPane = () => {
    return (
      <Fragment>
        <Row className="no-gutters">
          <Col onClick={() => actionControler(9010)}>
            <div className="dropdown-icon-item detail-action-icon cursor-pointer">
              <img src={statusIcon} alt="statusIcon" />
              <span>Incident</span>
            </div>
          </Col>
          <Col onClick={() => actionControler(9011)}>
            <div className="dropdown-icon-item detail-action-icon cursor-pointer">
              <img src={unloadIcon} alt="unloadIcon" />
              <span>Unload</span>
            </div>
          </Col>
          <Col onClick={() => actionControler(9012)}>
            <div className="dropdown-icon-item detail-action-icon cursor-pointer">
              <img src={locationIcon} alt="locationIcon" />
              <span>Location</span>
            </div>
          </Col>
        </Row>
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
      </Fragment>
    )
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Product Detail | productO - Product Information System</title>
        </MetaTags>
        <Container fluid={true}>
          <Dialog
            show={dialog.show}
            title={dialog.title}
            message={dialog.message}
            action={dialog.action}
            onConfirm={handleDialogOnConfirm}
            onCancel={handleDialogOnCancel}
          />
          <SuccessDialog
            message={message}
            show={actionSuccess && showMessage}
            onConfirm={() => dispatch(onActionSuccess())}
          />
          <CancelDialog
            message={message}
            show={actionFail && showMessage}
            onConfirm={() => {
              setDisableSearch(false)
              dispatch(onActionFail())
            }}
          />

          <LocalSuccessDialog
            message={localMessage}
            show={localActionSuccess}
            onConfirm={() => {
              setLocalActionSuccess(false)
              setLocalMessage("")
            }}
          />
          <LocalCancelDialog
            message={localMessage}
            show={localActionFail}
            onConfirm={() => {
              setLocalActionFail(false)
              setLocalMessage("")
            }}
          />
          <DetailTitle
            title={handleMainTitle()}
            breadcrumbItem="New Product"
            icon="ship"
            releaseAllow={
              documentValidated &&
              localDocument.doc_status !== DOCSTATUSCODES.RELEASE &&
              localDocument.doc_status === DOCSTATUSCODES.DRAFT
            }
            draftAllow={
              documentValidated &&
              localDocument.doc_status !== DOCSTATUSCODES.DRAFT &&
              localDocument.doc_status !== DOCSTATUSCODES.RELEASE
            }
            editAllow={
              (localDocument.doc_status === DOCSTATUSCODES.DRAFT ||
                localDocument.doc_status === DOCSTATUSCODES.RELEASE) &&
              formAction !== FORMCODES.EDIT
            }
            updateAllow={formAction === FORMCODES.EDIT}
            loader={loader}
            onDraft={() => actionRequestManager(FORMCODES.DRAFT)}
            onRelease={() => actionRequestManager(FORMCODES.RELEASE)}
            onEdit={() => actionRequestManager(FORMCODES.EDIT)}
            onUpdate={() => actionRequestManager(FORMCODES.UPDATE)}
            renderActionPane={() => renderActionPane()}
          ></DetailTitle>
          <Row>
            <Col lg="12">
              <Card className="mb-0">
                <CardBody className="pb-0 card-min-height">
                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}
                        >
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1)
                              handleDocumentValidation()
                            }}
                            disabled={!(passedSteps || []).includes(1)}
                          >
                            <span className="number">1</span> Product Details
                          </NavLink>
                        </NavItem>
                        {!disableControl("confim-tab") && (
                          <NavItem
                            className={classnames({ current: activeTab === 2 })}
                          >
                            <NavLink
                              className={classnames({
                                active: activeTab === 6,
                              })}
                              onClick={() => {
                                setactiveTab(6)
                                handleDocumentValidation()
                              }}
                              disabled={!(passedSteps || []).includes(6)}
                            >
                              <span className="number">5</span> Confirm Detail
                            </NavLink>
                          </NavItem>
                        )}
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId={1}>
                          <Row>
                            <Col xl="4">
                              <Card className="mb-3">
                                <CardBody>
                                  <Media>
                                    <img
                                      className="rounded avatar-lg ms-1 me-3"
                                      alt="productO"
                                      width="200"
                                      src={defaultProductImg}
                                    />

                                    <Media>
                                      <div className="text-muted">
                                        <h5 className="mb-1">
                                          Brand
                                          <span className="badge bg-success ms-2 align-bottom">
                                            {localDocument.brand !== ""
                                              ? localDocument.brand
                                              : "••••••••••"}
                                          </span>
                                        </h5>
                                        <h5 className="mb-1">
                                          Model
                                          <span className="badge bg-success ms-2 align-bottom">
                                            {localDocument.model !== ""
                                              ? localDocument.model
                                              : "••••••••••"}
                                          </span>
                                        </h5>
                                      </div>
                                    </Media>
                                  </Media>
                                </CardBody>
                                <CardBody
                                  disabled={true}
                                  style={{ marginTop: "100px" }}
                                ></CardBody>
                              </Card>
                            </Col>
                            <Col xl="8" className="p-3">
                              <h4 className="card-title">Product Details</h4>

                              <Row>
                                <AvForm
                                  onValidSubmit={(e, v) => {
                                    handleValidTabSubmit(e, v)
                                  }}
                                >
                                  <Row>
                                    <Col></Col>
                                    {!disableControl("tab-btn") ? (
                                      <Col>
                                        <button
                                          onClick={() => {
                                            handleactiveRequestedTab(
                                              activeTab + 1
                                            )
                                          }}
                                          className={
                                            activeTab === 5
                                              ? "btn btn-primary float-end ms-3 next disabled"
                                              : "btn btn-primary float-end ms-3 next"
                                          }
                                          disabled={disableControl("btn")}
                                          disabled={disableControl("btn")}
                                        >
                                          Next
                                        </button>
                                        <button
                                          className={
                                            activeTab === 1
                                              ? "btn btn-primary float-end ms-3 previous disabled"
                                              : "btn btn-primary float-end ms-3 previous"
                                          }
                                          onClick={() => {
                                            handleactiveRequestedTab(
                                              activeTab - 1
                                            )
                                          }}
                                          disabled={disableControl("btn")}
                                          disabled={disableControl("btn")}
                                        >
                                          Previous
                                        </button>
                                      </Col>
                                    ) : (
                                      <Col></Col>
                                    )}
                                  </Row>
                                  <Row>
                                    <Col lg="4">
                                      <div className="mb-3">
                                        <AvField
                                          name="id"
                                          label={translate("ID")}
                                          disabled={true}
                                          value={localDocument.id}
                                          helpMessage="Auto Genarated Field"
                                          onChange={(e, v) =>
                                            handleUserInput(e, v)
                                          }
                                        />
                                      </div>
                                    </Col>
                                    <Col lg="4">
                                      <div className="mb-3">
                                        <AvField
                                          name="brand"
                                          label={translate("Brand")}
                                          required
                                          value={localDocument.brand}
                                          onChange={(e, v) =>
                                            handleUserInput(e, v)
                                          }
                                          validate={{
                                            validator: avFieldVaildator,
                                          }}
                                          disabled={disableControl("brand")}
                                        ></AvField>
                                      </div>
                                    </Col>
                                    <Col lg="4">
                                      <div className="mb-3">
                                        <AvField
                                          name="model"
                                          label={translate("Model")}
                                          required
                                          value={localDocument.model}
                                          onChange={(e, v) =>
                                            handleUserInput(e, v)
                                          }
                                          validate={{
                                            validator: avFieldVaildator,
                                          }}
                                          disabled={disableControl("model")}
                                        ></AvField>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <div className="mb-3">
                                      <AvField
                                        name="description"
                                        type="textarea"
                                        label={translate("Description")}
                                        required
                                        value={localDocument.description}
                                        onChange={(e, v) =>
                                          handleUserInput(e, v)
                                        }
                                        validate={{
                                          validator: avFieldVaildator,
                                        }}
                                        disabled={disableControl("description")}
                                      ></AvField>
                                    </div>
                                  </Row>
                                </AvForm>
                              </Row>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId={2}>
                          <div className="row justify-content-center">
                            {errors ? renderErrorList() : null}

                            <Col lg="6">
                              <div className="text-center mt-5">
                                <div className="mb-4">
                                  {Object.keys(errors).length > 0 ? (
                                    <i className="mdi mdi-close-circle-outline text-danger display-4" />
                                  ) : (
                                    <i className="mdi mdi-check-circle-outline text-success display-4" />
                                  )}
                                </div>
                                <div>
                                  <h5>
                                    {Object.keys(errors).length > 0
                                      ? "Document not validated."
                                      : "Document validated."}
                                  </h5>
                                  <p className="text-muted">
                                    {Object.keys(errors).length > 0
                                      ? "Please fix the errors"
                                      : "Now, You can save the document."}
                                  </p>
                                  {Object.keys(errors).length > 0 ? (
                                    <button
                                      type="button"
                                      className="btn btn-danger "
                                      onClick={() => handleDocumentValidation()}
                                    >
                                      <i className="bx bx-sync font-size-16 align-middle me-2"></i>
                                      Validate Again
                                    </button>
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Modal
                isOpen={modalHatch}
                toggle={toggle}
                autoFocus={true}
                centered
              >
                <ModalHeader toggle={toggle}>{hatch.name}</ModalHeader>
                <ModalBody>
                  <AvForm
                    onValidSubmit={(e, v) => {
                      handleHatchUpdate(e, v)
                    }}
                  >
                    <Row form>
                      <Col className="col-12">
                        <div className="mb-3">
                          <AvField
                            name="hatch_index"
                            type="hidden"
                            value={hatch.hatch_index}
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="name"
                            label="Hatch Name"
                            type="text"
                            errorMessage="Hatch name cannot be empty"
                            validate={{
                              required: { value: true },
                            }}
                            value={hatch.name || ""}
                            disabled={disableControl("btn")}
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="material_qty"
                            label="Material Qty (MT)"
                            type="number"
                            errorMessage="Material Qty cannot be empty"
                            validate={{
                              required: { value: true },
                            }}
                            value={hatch.material_qty}
                            disabled={disableControl("material_qty")}
                          />
                        </div>
                        <div className="mb-3">
                          <AvField
                            name="unloaded_qty"
                            label="Unloaded Qty (MT)"
                            type="number"
                            value={hatch.unloaded_qty}
                            disabled={true}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-end">
                          <button
                            type="submit"
                            className="btn btn-success save-user"
                            disabled={disableControl("btn-hatch")}
                          >
                            Save
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </AvForm>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ProductDetailComponent.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(ProductDetailComponent))
