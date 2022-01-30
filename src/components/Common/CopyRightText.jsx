import React from "react"

const CopyRightText = () => {
  return (
    <div className="mt-4 mt-md-5 text-center">
      <p className="mb-0">
        © {new Date().getFullYear()} productO. <br />
        <i className="mdi mdi-security text-danger"></i> Developed by{" "}
        <span className="color-primary ">Nuwan</span>
      </p>
    </div>
  )
}

export default CopyRightText
