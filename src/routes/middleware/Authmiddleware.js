import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { CSPIN } from "constants/app-statics"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const cspin = localStorage.getItem("CSPIN")
      if (
        isAuthProtected &&
        localStorage.getItem("authUser") &&
        cspin === CSPIN
      ) {
        return (
          <Redirect
            to={{
              pathname: "/auth-lock-screen",
              state: { from: props.location },
            }}
          />
        )
      }
      if (isAuthProtected && !localStorage.getItem("authUser")) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware
