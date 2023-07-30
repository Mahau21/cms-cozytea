import React from "react"
import "./index.scss"
const Spinner = ({ isShow }) => {
  const __class = isShow ? "show_spin" : "hide_spin"
  return (
    <div className={`box-bg fixed ${__class}`}>
      <div class="spinner absolute"></div>
    </div>
  )
}

export default Spinner
