import React, { useEffect, useRef, useState } from "react"
import { Button, List, Input, Card, notification } from "antd"
import { SearchOutlined, ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { TitlePage } from "components/ui"

import { useParams, useLocation } from "react-router-dom"
import { apiPermission } from "api"
import "./index.scss"

export default function PermissionDetail() {
  const { id } = useParams()
  const name = useLocation().state
  const [defaultData, setDefaultData] = useState([])
  const [checkList, setCheckList] = useState([])
  const [checklistBack, setCheckListBack] = useState([])
  const [checked, setChecked] = useState([])
  const [checkedBack, setCheckedBack] = useState([])
  const [valSearch, setValSearch] = useState("")
  const __checkList = useRef([])
  const fetchVisiblePermission = async () => {
    try {
      const { data } = await apiPermission.getVisiblePermission(id)
      setDefaultData(data)
      setCheckList(data)
      __checkList.current = data
    } catch (e) {
      console.log(e)
    }
  }

  const fetchCurrentPermission = async () => {
    try {
      const { data } = await apiPermission.getCurrentPermission(id)
      setCheckListBack(data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchVisiblePermission()
    fetchCurrentPermission()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUpdatePermission = async () => {
    const _listCode = checklistBack.map((item) => {
      return item.codename
    })

    try {
      await apiPermission.updatePermission({ code: _listCode }, id)
      notification.success({
        message: "Cập nhật thành công!",
        duration: 2
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleToggle = (value) => () => {
    setCheckedBack([])
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleToggleBack = (value) => () => {
    setChecked([])
    const currentIndex = checkedBack.indexOf(value)
    const newChecked = [...checkedBack]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setCheckedBack(newChecked)
  }

  const handleTransferGo = () => {
    let _newCheckList = []
    const _newChecked = [...checked]

    _newCheckList = checkList.filter((item, index) => {
      return _newChecked.indexOf(item) < 0
    })

    setCheckList(_newCheckList)
    setCheckListBack([...checklistBack, ..._newChecked])
    setChecked([])
  }

  const handleTransferBack = () => {
    let _newCheckList = []
    const _newChecked = [...checkedBack]

    _newCheckList = checklistBack.filter((item, index) => {
      return _newChecked.indexOf(item) < 0
    })

    setCheckListBack(_newCheckList)
    setCheckList([...checkList, ..._newChecked])
    setCheckedBack([])
  }

  const onSearchData = (val) => {
    setValSearch(val)
    let result = []
    if (val === "") {
      result = defaultData.filter((el) => {
        return checklistBack.indexOf(el) < 0
      })
    } else {
      result = __checkList.current.filter((item) =>
        item.name.toUpperCase().includes(val.toUpperCase())
      )
    }

    setCheckList(result)
  }

  return (
    <section className="wapper_small">
      <TitlePage title="Phân quyền" />
      <div className="flex justify-between mb-4 bg-white p-4 rounded gap-4">
        <div className="text-lg">
          Tên nhóm quyền: <span className="text-primary-400">{name}</span>
        </div>
      </div>
      <div className="__content ">
        <div className="grid grid-cols-3 grid-rows-1 gap-4 max-w-4xl m-auto">
          <div>
            <List
              className="max-h-96 overflow-auto bg-white"
              bordered
              size="small"
              dataSource={checkList}
              header={
                <Input
                  value={valSearch}
                  placeholder="Tìm kiếm..."
                  onChange={(e) => onSearchData(e.target.value)}
                  prefix={<SearchOutlined />}
                />
              }
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <Button
                    className="w-full item-button"
                    type={checked.indexOf(item) !== -1 ? "primary" : "text"}
                    onClick={handleToggle(item)}
                  >
                    <p>{item.name}</p>
                  </Button>
                </List.Item>
              )}
            />
          </div>
          <div className="h-full flex justify-center items-center">
            <div className="flex flex-col">
              <div className="box-button-transfer">
                <Button
                  className="button-transfer"
                  type={checked.length > 0 ? "primary" : "text"}
                  disabled={checked.length > 0 ? false : true}
                  onClick={handleTransferGo}
                >
                  <ArrowRightOutlined style={{ fontSize: 25 }} />
                </Button>
              </div>
              <div className="box-button-transfer mt-3">
                <Button
                  className="button-transfer"
                  type={checkedBack.length > 0 ? "primary" : "text"}
                  disabled={checkedBack.length > 0 ? false : true}
                  onClick={handleTransferBack}
                >
                  <ArrowLeftOutlined style={{ fontSize: 25 }} />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <List
              className="max-h-96 overflow-auto bg-white"
              bordered
              size="small"
              dataSource={checklistBack}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <Button
                    className="w-full item-button"
                    type={checkedBack.indexOf(item) !== -1 ? "primary" : "text"}
                    onClick={handleToggleBack(item)}
                  >
                    <p>{item.name}</p>
                  </Button>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mb-4 bg-white p-4 rounded gap-4 mt-4">
        <Button type="primary" onClick={() => handleUpdatePermission()}>
          Lưu chỉnh sửa
        </Button>
      </div>
    </section>
  )
}
