import { useState, useEffect } from "react"
import { Form, Input, Button, notification, Divider } from "antd"
import { Link, useNavigate } from "react-router-dom"
import iconLogo from "images/logo.png"
// import local from "lib/localstorage"
import { apiAuth } from "api"
import "./index.scss"

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  async function onFinish(values) {
    try {
      setLoading(true)
      await apiAuth.register(values)
      notification.success({ message: "Thông báo!", description: "Đăng ký thành công!" })
      // localStorage.setItem("accessToken", access)
      // localStorage.setItem("refresh", refresh)
      // localStorage.setItem("role", JSON.stringify(role))
      navigate("/login")
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const checkToken = localStorage.getItem("accessToken")
    if (checkToken) navigate("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="login">
      <Form
        name="normal_login"
        layout="vertical"
        className="form_login shadow-lg"
        onFinish={onFinish}
      >
        <div className="flex justify-end">
          <img src={iconLogo} alt="" className="w-1/3" />
        </div>
        <div className="py-4 text-4xl font-bold mb-4">Đăng ký</div>
        <Form.Item
          label="Tài khoản (Email)"
          name="email"
          hasFeedback
          rules={[
            { required: true, message: "Xin mời nhập tài khoản" },
            { type: "email", message: "Không đúng định dạng email!" }
          ]}
        >
          <Input placeholder="admin@gmail.com" size="large" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Xin mời nhập số điện thoại!" },
            { len: 10, message: "Số điện thoại gồm 10 số" }
          ]}
        >
          <Input placeholder="0971972xxx" size="large" maxLength={10} />
        </Form.Item>

        <Form.Item
          label="Tên hiển thị"
          name="displayName"
          rules={[{ required: true, message: "Xin mời nhập tên hiển thị!" }]}
        >
          <Input placeholder="Tom..." size="large" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Xin mời nhập mật khẩu" },
            { min: 6, message: "Mật khẩu ít nhất 6 ký tự!" }
          ]}
        >
          <Input.Password placeholder="Mật khẩu..." size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            loading={loading}
            type="primary"
            htmlType="submit"
            className="mt-4 w-full mb-4"
          >
            Đăng ký
          </Button>
          <div className="flex justify-end items-center">
            <Link to="/forgot-password">Quên mật khẩu</Link>
            <Divider type="vertical" />
            <Link to="/login">Đăng nhập</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
