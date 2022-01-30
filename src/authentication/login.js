import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { Fragment, useEffect, useState } from "react"

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Form,
  UncontrolledAlert,
  Spinner,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

//Social Media Imports
import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

// actions
import { loginUser, apiError, socialLogin } from "../../store/actions"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/logo.svg"
import logodark from "assets/images/vums/logo.png"
import logolight from "assets/images/vums/logo.png"

//Import config
import { facebook, google } from "../../config"
import CarouselPage from "components/Common/CarouselPage"
import SignupNow from "components/Common/SignupNow"
import SocialMediaLogin from "components/Common/SocialMediaLogin"
import CopyRightText from "components/Common/CopyRightText"

const Login = props => {
  const dispatch = useDispatch()

  const { loading } = useSelector(state => ({
    loading: state.Login.loading,
  }))

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }))

  // Effects
  useEffect(() => {
    console.log(error)
  }, [error])

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    dispatch(loginUser(values, props.history))
  }

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.history, type))
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      }
      dispatch(socialLogin(postData, props.history, type))
    }
  }

  //handleGoogleLoginResponse
  const googleResponse = response => {
    signIn(response, "google")
  }

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  const facebookResponse = response => {
    signIn(response, "facebook")
  }

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>Login | productO - Product Information System</title>
        </MetaTags>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />
            <Col xl={3} className="login-page">
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="dashboard" className="d-block auth-logo">
                        <img
                          src={logodark}
                          alt=""
                          height="50"
                          className="auth-logo-dark"
                        />
                        <img
                          src={logolight}
                          alt=""
                          height="50"
                          className="auth-logo-light"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p className="text-muted">
                          Sign in to continue to productO.
                        </p>
                      </div>

                      {error && (
                        <UncontrolledAlert
                          color="danger"
                          className="alert-dismissible fade show"
                          role="alert"
                        >
                          <i className="mdi mdi-block-helper me-2"></i>
                          {error.message}
                        </UncontrolledAlert>
                      )}
                      <div className="mt-4">
                        <AvForm
                          className="form-horizontal"
                          onValidSubmit={(e, v) => {
                            handleValidSubmit(e, v)
                          }}
                        >
                          <div className="mb-3">
                            <AvField
                              name="email"
                              label="Email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              errorMessage="Enter your email address"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <div className="float-end">
                              <Link
                                to="auth-recoverpw-2"
                                className="text-muted"
                              >
                                Forgot password?
                              </Link>
                            </div>
                            <AvField
                              name="password"
                              label="Password"
                              className="form-control"
                              placeholder="Enter password"
                              type="password"
                              errorMessage="Enter your password"
                              required
                            />
                          </div>

                          <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="auth-remember-check"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="auth-remember-check"
                            >
                              Remember me
                            </label>
                          </div>

                          <div className="mt-3 d-grid">
                            {!loading && (
                              <button
                                className="btn btn-primary btn-block "
                                type="submit"
                              >
                                Log In
                              </button>
                            )}
                          </div>
                          <div
                            style={{ textAlign: "center", marginTop: "50px" }}
                          >
                            {loading && (
                              <Spinner
                                type="grow"
                                className="ms-2"
                                color="danger"
                              />
                            )}
                          </div>
                        </AvForm>

                        <SocialMediaLogin />

                        <SignupNow />
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

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
