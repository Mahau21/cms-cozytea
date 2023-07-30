import React from "react"
import { GoogleLogin } from "react-google-login"
import { FacebookFilled, GooglePlusOutlined } from "@ant-design/icons"

const LoginGoogleAndFacebook = () => {
  const responseGoogle = (response) => {
    console.log(response)
  }

  return (
    <div>
      <div className="a-f" href="#ds">
        <FacebookFilled />
        Đăng nhập với Facebook
      </div>
      <GoogleLogin
        clientId="178589677986-tu1fqs3mkat8hnuadfegc0g2bgqpd2aa.apps.googleusercontent.com"
        render={(renderProps) => (
          <span className="a-g" onClick={renderProps.onClick}>
            <GooglePlusOutlined />
            Đăng nhập với Google
          </span>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  )
}

export default LoginGoogleAndFacebook
