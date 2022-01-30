import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Link, withRouter } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"
import PropTypes from "prop-types"

//Import Countdown
import Countdown from "react-countdown"

//Import Images
// import logo from "../../assets/images/logo-dark.png"
import logo from "assets/images/vums/insee_logo_en.svg"
import loader from "assets/images/vums/loader.svg"
import maintanence from "../../assets/images/coming-soon.svg"

const AppDashboard = props => {
  const { history } = props

  const [activeDialog, setactiveDialog] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setactiveDialog(activeDialog + 1)
    }, 1000)
    if (activeDialog == 5) {
      clearTimeout(timer)
      history.push("/dashboard")
    }
  })

  const diloagLoader = () => {
    const dialog1 = "connecting to vums secure server..."
    const dialog2 = "secure connection established..."
    const dialog3 = "checking your browser..."
    const dialog4 = "redirecting your to the vums..."
    if (activeDialog == 1) {
      return dialog1
    }
    if (activeDialog == 2) {
      return dialog2
    }
    if (activeDialog == 3) {
      return dialog3
    }
    if (activeDialog == 4) {
      return dialog4
    }
    return "redirecting to your application..."
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>PRODCUTO</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-white">
          <i className="fas fa-home h2" />
        </Link>
      </div>

      <div className="my-5 pt-sm-5">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center">
                <Link to="/dashboard" className="d-block auth-logo">
                  <img src={logo} alt="logo" height="40" />
                </Link>
                <Row className="justify-content-center mt-5">
                  <Col sm="4">
                    <div className="maintenance-img">
                      <img
                        src={maintanence}
                        alt=""
                        className="img-fluid mx-auto d-block"
                      />
                    </div>
                  </Col>
                </Row>
                <img src={loader} alt="logo" height="50" />
                {/* <h4 className="mt-5">Let's get started with VUMS</h4> */}
                <p className="text-muted mt-2">{diloagLoader()}</p>
                {/* 
                <Row className="justify-content-center mt-5">
                  <Col md="8">
                    <div className="counter-number">
                      <Countdown date="2021/12/31" renderer={renderer} />
                    </div>
                  </Col>
                </Row> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

AppDashboard.propTypes = {
  history: PropTypes.object,
}

export default withRouter(AppDashboard)
