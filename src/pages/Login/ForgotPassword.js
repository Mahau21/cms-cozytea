import { useState } from "react"
import { Form, Input, Button, notification } from "antd"
import { Link } from "react-router-dom"
import { apiAuth } from "api"
import "./index.scss"

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  async function onFinish(values) {
    try {
      setLoading(true)
      const res = await apiAuth.forgotPassword(values)
      notification.success({
        message: "Thông báo!",
        description: "Vui lòng kiểm tra email đăng ký!"
      })
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
    console.log("Received values of form: ", values)
  }

  return (
    <div className="login">
      <Form
        name="normal_login"
        layout="vertical"
        className="form_login shadow-lg"
        onFinish={onFinish}
      >
        <div className="py-4 text-4xl font-bold mb-4">Quên mật khẩu</div>
        <Form.Item
          label="Nhập email"
          name="email"
          rules={[{ required: true, message: "Xin mời nhập email" }]}
        >
          <Input placeholder="admin@gmail.com" />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit" className="mt-4 w-full mb-4">
            Xác nhận
          </Button>
          <div className="flex justify-end">
            <Link to="/login">Đăng nhập</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
