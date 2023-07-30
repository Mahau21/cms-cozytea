import React from "react"
import Routes from "components/router/Router"
import "./tailwindcss.css"
import "antd/dist/antd.less"
import "./index.css"
import moment from "moment-timezone"
import { StoreProvider } from "components/ui/Context"
moment.tz.setDefault("Asia/Ho_Chi_Minh")

function App() {
  return (
    <div className="App font-roboto">
      <StoreProvider>
        <Routes />
      </StoreProvider>
    </div>
  )
}

export default App
