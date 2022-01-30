import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import { Col, Container, Row } from "reactstrap"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

//redux
import { useSelector, useDispatch } from "react-redux"

// import images
import logodark from "assets/images/vums/insee_logo_en.svg"
import logolight from "assets/images/vums/insee_logo_en.svg"
import user from "../../assets/images/users/avatar-1.jpg"
import CarouselPage from "components/Common/CarouselPage"
import SignupNow from "components/Common/SignupNow"
import SocialMediaLogin from "components/Common/SocialMediaLogin"
import CopyRightText from "components/Common/CopyRightText"
import {
  getCurrentUserDetail as onGetUser,
  loginUser as onLoginUser,
} from "store/actions"
import { PROFILE_IMG } from "constants/profile-imgs"
import { CSPIN } from "constants/app-statics"

const LockScreen = props => {
  const dispatch = useDispatch()

  const [currentUser, setCurrentUser] = useState({})
  const [profileImage, setProfileImage] = useState(PROFILE_IMG[0])

  const { user } = useSelector(state => ({
    user: state.Login.user,
  }))

  useEffect(() => {
    if (user) {
      const selectedImg = PROFILE_IMG.find(im => im.code === user.image)
      if (selectedImg) {
        setProfileImage(selectedImg)
      }
      setCurrentUser(user)
    }
  }, [user])

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const user = JSON.parse(localStorage.getItem("authUser"))
      dispatch(onGetUser(user.id))
    }
    localStorage.setItem("CSPIN", CSPIN)
  }, [dispatch])

  // handleValidSubmit
  const handleValidSubmit = (event, { password }) => {
    const payload = { email: currentUser.email, password: password }
    dispatch(onLoginUser(payload, props.history))
  }

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>Lock Screen | VUMS - Vessel Unloading Monitoring System</title>
        </MetaTags>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />
            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="dashboard" className="d-block auth-logo">
                        <img
                          src={logodark}
                          alt=""
                          height="28"
                          className="auth-logo-dark"
                        />
                        <img
                          src={logolight}
                          alt=""
                          height="28"
                          className="auth-logo-light"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Lock screen</h5>
                        <p className="text-muted">
                          Enter your password to unlock the screen!
                        </p>
                      </div>

                      <div className="mt-4">
                        <AvForm
                          className="form-horizontal"
                          onValidSubmit={(e, v) => {
                            handleValidSubmit(e, v)
                          }}
                        >
                          {props.error && props.error ? (
                            <Alert color="danger">{props.error}</Alert>
                          ) : null}

                          <div className="user-thumb text-center mb-4">
                            <img
                              src={profileImage.img}
                              className="rounded-circle img-thumbnail avatar-md"
                              alt="thumbnail"
                            />
                            <h5 className="font-size-15 mt-3">
                              {currentUser.display_name}
                            </h5>
                          </div>

                          <div className="mb-3">
                            <AvField
                              name="password"
                              label="Password"
                              value=""
                              className="form-control"
                              placeholder="Enter password"
                              type="password"
                              required
                            />
                          </div>

                          <div className="text-end">
                            <button
                              className="btn btn-primary w-md"
                              type="submit"
                            >
                              {" "}
                              Unlock{" "}
                            </button>
                          </div>
                        </AvForm>
                        <div className="mt-5 text-center">
                          <p>
                            Not you ? return{" "}
                            <Link
                              to="/login"
                              className="fw-medium text-primary"
                            >
                              {" "}
                              Sign In{" "}
                            </Link>{" "}
                          </p>
                        </div>
                      </div>
                    </div>

                    <CopyRightText />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(LockScreen)
LockScreen.propTypes = {
  history: PropTypes.object,
}
