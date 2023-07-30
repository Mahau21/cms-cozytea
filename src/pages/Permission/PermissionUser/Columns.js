const { Button, Tag } = require("antd")

const listGroups = [
  { id: 2, name: "Collaborator" },
  { id: 3, name: "Staff" },
  { id: 1, name: "Manager" }
]
function getRole(v) {
  const item = listGroups.find((i) => i.id === v[0])
  return item ? item.name : "N/A"
}

export default function columns(actionData) {
  return [
    { key: "first_name", dataIndex: "first_name", title: "Họ", minWidth: 250 },
    { key: "last_name", dataIndex: "last_name", title: "Tên", width: 130 },
    { key: "email", dataIndex: "email", title: "Email", width: 200 },
    {
      title: "Group name",
      key: "groups",
      dataIndex: "groups",
      width: 150,
      render: (v) => <span>{getRole(v)}</span>
    },

    {
      key: "is_active",
      dataIndex: "is_active",
      title: "Trạng thái",
      align: "center",
      width: 90,
      render: (isActive) => {
        return (
          <Tag className="rounded-xl" color={isActive ? "green" : "red"}>
            {isActive ? "Active" : "Inactive"}
          </Tag>
        )
      }
    },
    {
      key: "action",
      width: 80,
      title: "Thao tác",
      render: (record) => {
        return (
          <Button type="link" onClick={() => actionData("edit", record)}>
            Edit
          </Button>
        )
      }
    }
  ]
}
