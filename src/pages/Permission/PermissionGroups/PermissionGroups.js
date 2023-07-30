import React, { useState, useEffect } from "react"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import { Table, TitlePage } from "components/ui"
import { apiPermission } from "api"

const columns = (actionData) => {
  return [
    { key: "name", dataIndex: "name", title: "Tên Group", width: "100%" },
    {
      key: "action",
      title: "Hành động",
      width: 100,
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

export default function CheckboxList() {
  const navigate = useNavigate()

  const [listData, setListData] = useState([])
  const [loading, setloading] = useState(false)

  const fetchGroups = async () => {
    let _newData = []

    setloading(true)
    try {
      const { data } = await apiPermission.getGroups()
      _newData = data.filter((item) => item.name !== "Manager")
    } catch (e) {
      console.log(e)
    } finally {
      setListData(_newData)
      setloading(false)
    }
  }

  function actionData(key, record) {
    console.log({ record })
    if (key === "edit")
      navigate(`/staff/groups/${record.id}`, {
        state: record.name
      })
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <section className="wapper_small">
      {/* <div className="flex justify-end mb-4">
          <Button onClick={() => actionData("new", null)} type="primary">
            Tạo mới
          </Button>
        </div> */}
      <TitlePage title="Nhóm quyền" />
      <div className="__content">
        <Table columns={columns(actionData)} dataSource={listData} loading={loading} />
      </div>
      {/* <Pagination onChange={changePage} {...__params.current} /> */}
    </section>
  )
}
