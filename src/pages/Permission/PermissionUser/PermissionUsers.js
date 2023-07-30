import React, { useState, useEffect, useRef } from "react"
import { Tag, Button } from "antd"
import { Pagination, Table, TitlePage } from "components/ui"
import { apiPermission } from "api"
import { PlusOutlined } from "@ant-design/icons"
import DrawerUpdate from "./DrawerUpdate"
import columns from "./Columns"

const dfParams = {
  page_num: 1,
  page_size: 10,
  count: 10
}

export default function ListUser() {
  const [rows, setRows] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const item = useRef()
  const __pagination = useRef(dfParams)

  const fetch = async () => {
    setLoading(true)
    let _rows = []
    try {
      const { data, count } = await apiPermission.getStaffs(__pagination.current)
      _rows = data
      __pagination.current.count = count
    } catch (e) {
      console.log(e)
    } finally {
      setRows(_rows)
      setLoading(false)
    }
  }

  function changePage(page_num, page_size) {
    __pagination.current.page_num = page_num
    __pagination.current.page_size = page_size
    fetch()
  }

  const actionData = (type, record) => {
    if (type === "new") {
      item.current = false
    } else {
      item.current = record
    }
    setVisible(true)
  }

  function onClose(isLoad) {
    setVisible(false)
    if (isLoad) {
      fetch()
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý người dùng" />

      <div className="flex justify-end mb-4 bg-white p-4 rounded gap-4 shadow">
        <Button onClick={() => actionData("new", false)} type="primary" icon={<PlusOutlined />}>
          Tạo mới người dùng
        </Button>
      </div>
      <div className="__content">
        <Table columns={columns(actionData)} dataSource={rows} loading={loading} />
        <Pagination onChange={changePage} {...__pagination.current} />
      </div>

      <DrawerUpdate visible={visible} item={item.current} onClose={onClose} />
    </section>
  )
}
