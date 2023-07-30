import { useRef, useState } from "react"
import { Modal, Form, Input, Switch, notification } from "antd"
import { useEffect } from "react"
import { apiSite } from "api"

export default function App({ visible, onClose, item }) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const formRef = useRef(null)

  async function onFinish(values) {
    try {
      setLoading(true)
      if (item) {
        await apiSite.update(item.id, values)
        notification.success({ message: "Thông báo!", description: "Update thành công!" })
      } else {
        await apiSite.create(values)
        notification.success({ message: "Thông báo!", description: "Tạo mới thành công!" })
      }
      resetForm()
      onClose(true)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }
  function resetForm() {
    form.resetFields()
    form.setFieldsValue({
      isActived: true
    })
  }

  useEffect(() => {
    if (formRef.current) {
      if (item) {
        form.setFieldsValue(item)
      } else {
        resetForm()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  useEffect(() => {
    resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal
      title={item ? "Cập nhật hãng" : "Thêm mới hãng"}
      visible={visible}
      onOk={() => form.submit()}
      confirmLoading={loading}
      onCancel={() => onClose(false)}
    >
      <Form name="update_site" ref={formRef} onFinish={onFinish} form={form} layout="vertical">
        <Form.Item
          label="Tên hãng"
          name="name"
          hasFeedback
          rules={[{ required: true, message: "Nhập tên hãng!" }]}
        >
          <Input placeholder="Adidas US..." />
        </Form.Item>

        <Form.Item
          label="Mã code"
          hasFeedback
          name="code"
          rules={[{ required: true, message: "Nhập mã code!" }]}
        >
          <Input placeholder="Adidas..." />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          hasFeedback
          rules={[{ required: true, message: "Nhập mô tả!" }]}
        >
          <Input.TextArea placeholder="Website adidas..." />
        </Form.Item>

        <Form.Item label="Trạng thái" name="isActived" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}
