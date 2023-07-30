import { useRef, useState } from "react"
import { Drawer, Form, Input, notification, Switch, InputNumber, Space, Button } from "antd"
import { useEffect } from "react"
import { apiTag } from "api"
import UploadImage from "components/UploadImage"
import { SendOutlined } from "@ant-design/icons"

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
}

function geValuesTest(count) {
  return {
    name: `Tag ${count}`,
    description: `Description ${count}`,
    thumbnail:
      "https://imgonsport.vtvcab.vn/image-upload/720x405/2685db54-1f08-4d8e-aa23-3dc79e3c66e8.jpg",
    is_visible: true,
    order_number: count
  }
}

export default function Tag({ visible, onClose, item, count }) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const formRef = useRef(null)

  async function onFinish(values) {
    const d = new Date()
    let day = d.toTimeString()
    console.log(values, day, "hien thi value")
    try {
      setLoading(true)
      if (item) {
        await apiTag.update(item.id, values)
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
      } else {
        await apiTag.create(values)
        notification.success({ message: "Thông báo!", description: "Tạo mới thành công!" })
      }
      setLoading(false)
      form.resetFields()
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
      form.setFieldsValue(geValuesTest(count))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <Drawer
      title="Tạo mới tag"
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
      <Form {...layout} name="update_tag" ref={formRef} onFinish={onFinish} form={form}>
        <Form.Item label="Tên tag" name="name" rules={[{ required: true, message: "Nhập tên!" }]}>
          <Input placeholder="Nhập tag..." />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
