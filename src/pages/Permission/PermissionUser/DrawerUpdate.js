import React, { useEffect, useState } from "react"
import { Drawer, Form, Button, Input, Select, DatePicker, Space, notification } from "antd"
import { SendOutlined } from "@ant-design/icons"
import UploadImage from "components/UploadImage"
import { apiPermission } from "api"
import moment from "moment-timezone"
const { Option } = Select

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
}

const dfData = {
  email: "",
  first_name: "",
  groups: undefined,
  last_name: "",
  partner: 0,
  profile: {
    avatar: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-.jpg",
    birth_day: moment(new Date(), "YYYY-MM-DD"),
    phone: ""
  },
  username: "",
  password: ""
}

const DrawerTest = ({ visible, onClose, item }) => {
  const [form] = Form.useForm()
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchGroup = async () => {
    try {
      const { data } = await apiPermission.getGroups()
      setGroups(data)
    } catch (e) {
      console.log(e)
    }
  }

  async function onSubmit(values) {
    const bodyData = {
      ...values,
      groups: [values.groups],
      email: values.email.toLowerCase(),
      username: values.username.toLowerCase(),
      profile: {
        ...values.profile,
        birth_day: moment(values.profile.birth_day).format("YYYY-MM-DD")
      }
    }
    try {
      setLoading(true)
      if (item) {
        await apiPermission.updateStaff(bodyData, item.id)
      } else {
        await apiPermission.createStaff(bodyData)
      }
      notification.success({
        message: item ? "Chỉnh sửa thành công!" : "Tạo thành công!",
        duration: 2
      })
      onClose(true)
      form.setFieldsValue(dfData)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onChangeData = (e) => {
    const regNumber = /^[0-9]*$/
    const val = e.target.value

    form.setFields([
      {
        name: ["profile", "phone"],
        value: regNumber.test(val) ? val : ""
      }
    ])
  }

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        ...item,
        groups: item.groups[0],
        profile: {
          ...item.profile,
          birth_day: item?.profile?.birth_day
            ? moment(item?.profile?.birth_day, "YYYY-MM-DD")
            : null
        }
      })
    } else {
      form.setFieldsValue(dfData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  useEffect(() => {
    fetchGroup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Drawer
      title="Tạo mới người dùng"
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
      <Form name="update_user" {...layout} onFinish={onSubmit} className="modal-form" form={form}>
        <Form.Item name={["profile", "avatar"]} label="Avatar">
          <UploadImage />
        </Form.Item>

        <Form.Item
          name="first_name"
          label="Họ"
          rules={[{ required: true, message: "Họ không được trống!" }]}
        >
          <Input placeholder="Họ" />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Tên"
          rules={[{ required: true, message: "Tên không được trống!" }]}
        >
          <Input placeholder="Tên" />
        </Form.Item>

        <Form.Item
          name={["profile", "phone"]}
          label="Số điện thoại"
          rules={[
            { required: true, message: "Phone không được trống!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const regPhone = /(0[3|5|7|8|9])+([0-9]{8})\b/

                if (regPhone.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error("Số điện thoại chưa đúng chuẩn!"))
              }
            })
          ]}
        >
          <Input
            className="modal-input-number"
            placeholder="Số điện thoại"
            onChange={onChangeData}
            maxLength={10}
          />
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name={["profile", "birth_day"]}
          rules={[{ required: true, message: "Ngày sinh không được để trống!" }]}
        >
          <DatePicker format="DD-MM-YYYY" placeholder="Ngày sinh" />
        </Form.Item>

        <Form.Item
          name="groups"
          label="Nhóm"
          rules={[{ required: true, message: "Hãy chọn nhóm người dùng!" }]}
        >
          <Select placeholder="Nhóm người dùng">
            {groups.map((item, index) => (
              <Option value={item.id} key={index}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="username"
          label="Tài khoản"
          rules={[
            {
              required: true,
              message: "Useranme không được để trống!"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value === value.toLowerCase()) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error("Tài khoản phải là chữ thường, không dấu, không khoảng trống!")
                )
              }
            })
          ]}
        >
          <Input placeholder="Tài khoản..." disabled={item ? true : false} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", required: true, message: "Hãy nhập email!" }]}
        >
          <Input placeholder="Email" disabled={item ? true : false} />
        </Form.Item>

        {!item && (
          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
            <Input.Password placeholder="Mật khẩu" autoComplete="new-password" />
          </Form.Item>
        )}
      </Form>
    </Drawer>
  )
}

export default DrawerTest
