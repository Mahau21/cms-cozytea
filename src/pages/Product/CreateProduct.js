import { SendOutlined } from "@ant-design/icons"
import {
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  Switch,
  DatePicker,
  Col,
  Row,
  Select
} from "antd"
import { apiProduct, apiCategory, apiRegion, apiSite } from "api"
import { TitlePage } from "components/ui"
import UploadImage from "components/UploadImage"
import { useState, useEffect, useRef } from "react"
import { paramsUrl } from "lib/function"

const { Option } = Select

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

export default function CreateProduct() {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [categoryList, setCategoryList] = useState([])
  const [regionList, setRegionList] = useState([])
  const [siteList, setSiteList] = useState([])

  const __pagination = useRef({
    page_num: 1,
    page_size: 20,
    count: 0,
    ...paramsUrl.get()
  })

  async function onFinish(values) {
    console.log(values)
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

  async function fetch() {
    let _cateList = []
    let _regionList = []
    let _siteList = []
    try {
      const categories = await apiCategory.gets(__pagination.current)
      _cateList = categories.data
      const regions = await apiRegion.gets(__pagination.current)
      _regionList = regions.data
      const sites = await apiCategory.gets(__pagination.current)
      _siteList = sites.data

      console.log(_regionList, "region")
      console.log(_siteList, "site")
    } catch (e) {
    } finally {
      setCategoryList(_cateList)
      setRegionList(_regionList)
      setSiteList(_siteList)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý product" />

      <div className="__content">
        <Form {...layout} name="update_product" onFinish={onFinish} form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Tên product"
                name="title"
                rules={[{ required: true, message: "Nhập tên!" }]}
              >
                <Input placeholder="Nhập product..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Link sản phẩm"
                name="link"
                rules={[{ required: true, message: "Link sản phẩm!" }]}
              >
                <Input placeholder="Nhập link ...." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Thumb"
                name="thumb"
                rules={[{ required: true, message: "Nhập thumbnail!" }]}
              >
                <UploadImage />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Ảnh"
                name="images"
                rules={[{ required: true, message: "Nhập images!" }]}
              >
                <UploadImage />
              </Form.Item>
            </Col>
            <Col span={24}>
              {" "}
              <Form.Item
                label="Giá"
                name="price"
                rules={[{ required: true, message: "Nhập giá!" }]}
              >
                <InputNumber placeholder="Giá..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              {" "}
              <Form.Item
                label="Giá Sale"
                name="priceSale"
                rules={[{ required: true, message: "Nhập giá Sale!" }]}
              >
                <InputNumber placeholder="Giá sale..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              {" "}
              <Form.Item
                label="Tỉ lệ chiết khấu"
                name="discountPercent"
                rules={[{ required: true, message: "Nhập tỉ lệ chiết khấu!" }]}
              >
                <InputNumber placeholder="Tỉ lệ chiết khấu..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Giá chiết khấu"
                name="discountPrice"
                rules={[{ required: true, message: "Nhập giá chiết khấu!" }]}
              >
                <InputNumber placeholder="Giá triết khấu..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              {" "}
              <Form.Item
                label="Khu vực"
                name="regionId"
                rules={[{ required: true, message: "Nhập khu vực!" }]}
              >
                <Select placeholder="Chọn Khu Vực ....">
                  {regionList?.length > 0 &&
                    regionList.map((item, k) => {
                      return (
                        <Option value={item.id} key={k}>
                          {item.name}
                        </Option>
                      )
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Site"
                name="siteId"
                rules={[{ required: true, message: "Nhập siteId!" }]}
              >
                <Select placeholder="Chọn Site ....">
                  {siteList?.length > 0 &&
                    siteList.map((item, k) => {
                      return (
                        <Option value={item.id} key={k}>
                          {item.name}
                        </Option>
                      )
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Ngày bắt đầu"
                name="startDate"
                rules={[{ required: true, message: "Nhập Ngày bắt đầu!" }]}
              >
                <DatePicker showTime={{ format: "HH:mm" }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Ngày kết thúc"
                name="endDate"
                rules={[{ required: true, message: "Nhập Ngày bắt đầu!" }]}
              >
                <DatePicker showTime={{ format: "HH:mm" }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              {" "}
              <Form.Item
                label="Ghi chú"
                name="description"
                rules={[{ required: true, message: "Ghi chú!" }]}
              >
                <Input placeholder="Ghi chú ...." />
              </Form.Item>
            </Col>
            <Col span={24}>
              {" "}
              <Form.Item
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: "Số lượng!" }]}
              >
                <InputNumber placeholder="Số lượng ...." />
              </Form.Item>
            </Col>
            {/* <Col span={24}>
              <Form.Item label="Trạng thái" name="isActived" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col> */}
            <Col span={24}>
              {" "}
              <Form.Item
                label="Category"
                name="categoryId"
                rules={[{ required: true, message: "categoryid" }]}
              >
                <Select placeholder="Chọn Category ....">
                  {categoryList?.length > 0 &&
                    categoryList.map((item, k) => {
                      return (
                        <Option value={item.id} key={k}>
                          {item.name}
                        </Option>
                      )
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end p-4">
            <Button
              loading={loading}
              onClick={() => form.submit()}
              type="primary"
              icon={<SendOutlined />}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </section>
  )
}
