import { SendOutlined } from "@ant-design/icons"
import { Button, Form, Input, InputNumber, notification, Switch } from "antd"
import { apiProduct } from "api"
import { TitlePage } from "components/ui"
import UploadImage from "components/UploadImage"
import { useState } from "react"

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
}

function geValuesTest() {
  return {
    name: `Product `,
    description: `Description `,
    thumbnail:
      "https://imgonsport.vtvcab.vn/image-upload/720x405/2685db54-1f08-4d8e-aa23-3dc79e3c66e8.jpg",
    is_visible: true
  }
}

export default function UpdateProduct() {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  async function onFinish(values) {
    try {
      setLoading(true)
      await apiProduct.create(values)
      notification.success({ message: "Thông báo!", description: "Tạo mới thành công!" })

      setLoading(false)
      form.resetFields()
      form.setFieldsValue(geValuesTest())
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý product" />

      <div className="__content">
        <Form {...layout} name="update_product" onFinish={onFinish} form={form}>
          <Form.Item
            label="Tên product"
            name="name"
            rules={[{ required: true, message: "Nhập tên!" }]}
          >
            <Input placeholder="Nhập product..." />
          </Form.Item>

          <Form.Item
            label="Ảnh"
            name="thumbnail"
            rules={[{ required: true, message: "Nhập thumbnail!" }]}
          >
            <UploadImage />
          </Form.Item>

          <Form.Item
            label="Vị trí"
            name="order_number"
            rules={[{ required: true, message: "Nhập vị trí!" }]}
          >
            <InputNumber placeholder="1,2,3..." />
          </Form.Item>

          <Form.Item label="Hiển thị" name="is_visible" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Button
            loading={loading}
            onClick={() => form.submit()}
            type="primary"
            icon={<SendOutlined />}
          >
            Submit
          </Button>
        </Form>
      </div>
    </section>
  )
}
