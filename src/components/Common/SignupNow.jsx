import React from "react"
import { Link } from "react-router-dom"

import appConfig from "../../config"

const SignupNow = () => {
  const isSignUpEnabled = appConfig.app.SIGNUP_ENABLED
  return (
    isSignUpEnabled && (
      <div className="mt-5 text-center">
        <p>
          Don't have an account ?{" "}
          <Link to="pages-register-2" className="fw-medium text-primary">
            Signup now
          </Link>
        </p>
      </div>
    )
  )
}

export default SignupNow
