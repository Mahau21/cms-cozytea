import { Form, Input, Button, notification } from "antd"
import { apiAuth } from "api"
import { useNavigate } from "react-router-dom"
import querystring from "querystring"
import "./index.scss"

export default function CreatePassword() {
  const navigate = useNavigate()
  const { token } = querystring.parse(window.location.search.split("?")[1])
  async function onFinish(values) {
    try {
      const res = await apiAuth.createPassword({ ...values, token })
      notification.success({
        message: "Thông báo!",
        description: "Tạo mới mật khẩu thành công. Tự động về trang đăng nhập sau 5s",
        duration: 5,
        onClose: () => navigate("/login")
      })
    } catch (e) {
      console.log(e)
      if (e.response) {
        notification.error({
          message: "Thông báo!",
          description: e.response.data.error
        })
      }
    }
    console.log("Received values of form: ", values)
  }

  return (
    <div className="login">
      <Form
        name="normal_login"
        onFinish={onFinish}
        layout="vertical"
        className="form_login shadow-lg"
      >
        <div className="py-4 text-4xl font-bold mb-4">Mật khẩu</div>
        <Form.Item
          name="password"
          label="Mật khẩu"
          hasFeedback
          rules={[{ required: true, message: "Nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu..." />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Nhập lại mật khẩu"
          dependencies={["password"]}
          placeholder="Nhập mật khẩu..."
          hasFeedback
          rules={[
            {
              required: true,
              message: "Nhập lại mật khẩu!"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error("Mật khẩu không khớp trùng nhau!"))
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full mt-6">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
