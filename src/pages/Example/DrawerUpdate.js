import { useRef, useState } from "react"
import { Drawer, Form, Input, notification, Switch, InputNumber, Space, Button } from "antd"
import { useEffect } from "react"
import { apiExample } from "api"
import UploadImage from "components/UploadImage"
import { SendOutlined } from "@ant-design/icons"

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
}

function geValuesTest(count) {
  return {
    name: `Example ${count}`,
    description: `Description ${count}`,
    thumbnail:
      "https://imgonsport.vtvcab.vn/image-upload/720x405/2685db54-1f08-4d8e-aa23-3dc79e3c66e8.jpg",
    is_visible: true,
    order_number: count
  }
}

export default function Example({ visible, onClose, item, count }) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const formRef = useRef(null)

  async function onFinish(values) {
    try {
      setLoading(true)
      if (item) {
        await apiExample.update(item.id, values)
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
      } else {
        await apiExample.create(values)
        notification.success({ message: "Thông báo!", description: "Tạo mới thành công!" })
      }
      setLoading(false)
      form.setFieldsValue(geValuesTest(count))
      onClose(true)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (item) {
      form.setFieldsValue(item)
    } else {
      form.resetFields()
      form.setFieldsValue(geValuesTest(count))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <Drawer
      title="Tạo mới example"
      width={680}
      onClose={onClose}
      visible={visible}
      forceRender={true}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            loading={loading}
            onClick={() => form.submit()}
            type="primary"
            icon={<SendOutlined />}
          >
            Submit
          </Button>
        </Space>
      }
    >
      <Form {...layout} name="update_example" ref={formRef} onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên example"
          name="name"
          rules={[{ required: true, message: "Nhập tên!" }]}
        >
          <Input placeholder="Nhập example..." />
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
      </Form>
    </Drawer>
  )
}
