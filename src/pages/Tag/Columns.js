import { Dropdown, Button, Popconfirm } from "antd"
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import moment from "moment-timezone"

export default function columns(onAction) {
  return [
    {
      title: "Tên",
      dataIndex: "name",
      minWidth: 200
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 140,
      sorter: true,
      render: (v) => <div className="text-gray-400">{moment(v).format("HH:mm DD-MM-Y")}</div>
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "modified",
      key: "modified",
      width: 140,
      sorter: true,
      render: (v) => <div className="text-gray-400">{moment(v).format("HH:mm DD-MM-Y")}</div>
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      fixed: "right",
      key: "id",
      width: 80,
      align: "center",
      render: (v, r) => (
        <div className="article_action">
          <Dropdown
            trigger={["click"]}
            overlay={
              <div className="shadow_antd w-36">
                <Button
                  icon={<EditOutlined />}
                  type="primary"
                  className="w-full"
                  onClick={() => onAction("edit", r)}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa!"
                  onConfirm={() => onAction("remove", v)}
                >
                  <Button icon={<DeleteOutlined />} type="primary" danger className="w-full">
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            }
          >
            <Button type="text" size="small" icon={<AppstoreAddOutlined />} />
          </Dropdown>
        </div>
      )
    }
  ]
}
