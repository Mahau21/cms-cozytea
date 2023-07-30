import React, { useState, useEffect, useRef } from "react"
import { Button, Input, notification } from "antd"
import { Pagination, Table, TitlePage } from "components/ui"
import { PlusOutlined } from "@ant-design/icons"
import columns from "./Columns"
import DrawerUpdate from "./DrawerUpdate"
import { paramsUrl } from "lib/function"
import { apiExample } from "api"
import Filter from "./Filter"

export default function Example() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const item = useRef(false)

  const __pagination = useRef({
    page_num: 1,
    page_size: 20,
    count: 0,
    ...paramsUrl.get()
  })

  const fetch = async () => {
    setLoading(true)
    let _rows = []
    try {
      const { data, count } = await apiExample.gets(__pagination.current)
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

  async function onRemove(id) {
    try {
      await apiExample.remove(id)
      notification.success({ title: "Thông báo!", message: "Xóa thành công" })
      fetch()
    } catch (error) {
      console.log(error)
    }
  }

  const actionData = (key, v) => {
    if (key === "new") {
      item.current = false
      setVisible(true)
    }
    if (key === "edit") {
      item.current = v
      setVisible(true)
    }
    if (key === "remove") {
      onRemove(v)
    }
  }

  function onClose(isLoad) {
    setVisible(false)
    if (isLoad) {
      fetch()
    }
  }

  const onFilter = (data) => {
    __pagination.current.page_num = 1
    __pagination.current = { ...__pagination.current, ...data }
    fetch()
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <section className="wapper_small">
      <TitlePage title="Quản lý example" />

      <div className="flex justify-between mb-4 bg-white p-4 rounded gap-4 shadow">
        <Filter filter={__pagination.current} onFilter={onFilter} />
        <Button onClick={() => actionData("new", false)} type="primary" icon={<PlusOutlined />}>
          Tạo mới example
        </Button>
      </div>
      <div className="__content">
        <Table columns={columns(actionData)} dataSource={rows} loading={loading} />
        <Pagination onChange={changePage} {...__pagination.current} />
      </div>

      <DrawerUpdate
        visible={visible}
        item={item.current}
        onClose={onClose}
        count={__pagination.current.count}
      />
    </section>
  )
}
