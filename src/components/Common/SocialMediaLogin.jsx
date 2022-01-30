import React from "react"
import { Link } from "react-router-dom"
import { Form } from "reactstrap"

import appConfig from "../../config"

const SocialMediaLogin = () => {
  const isSMLoginEnabled = appConfig.app.SMLOGIN_ENABLED
  return (
    isSMLoginEnabled && (
      <Form action="dashboard">
        <div className="mt-4 text-center">
          <h5 className="font-size-14 mb-3">Sign in with</h5>

          <ul className="list-inline">
            <li className="list-inline-item">
              <Link
                to="#"
                className="social-list-item bg-primary text-white border-primary"
              >
                <i className="mdi mdi-facebook"></i>
              </Link>
            </li>{" "}
            <li className="list-inline-item">
              <Link
                to="#"
                className="social-list-item bg-info text-white border-info"
              >
                <i className="mdi mdi-twitter"></i>
              </Link>
            </li>{" "}
            <li className="list-inline-item">
              <Link
                to="#"
                className="social-list-item bg-danger text-white border-danger"
              >
                <i className="mdi mdi-google"></i>
              </Link>
            </li>
          </ul>
        </div>
      </Form>
    )
  )
}

export default SocialMediaLogin
