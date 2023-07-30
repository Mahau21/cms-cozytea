import { useState, Fragment, useRef, useEffect } from "react"
import { Space, Table, Checkbox, Popover } from "antd"
import { SettingOutlined } from "@ant-design/icons"
import "./index.scss"
const CheckboxGroup = Checkbox.Group

function Dropdown({ columns, onChangeList }) {
  const plainOptions = columns.map((i, _index) => {
    return { label: i.title, value: _index }
  })
  const [checkedList, setCheckedList] = useState(
    plainOptions.map((i) => {
      return i.value
    })
  )
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(true)

  const onChange = (list) => {
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < plainOptions.length)
    setCheckAll(list.length === plainOptions.length)
    onChangeList(list)
  }

  const onCheckAllChange = (e) => {
    const list = e.target.checked
      ? plainOptions.map((i) => {
          return i.value
        })
      : []
    setCheckedList(list)
    onChangeList(list)
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }

  return (
    <div className="checkbox_setting" style={{ width: 200 }}>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Chọn tất cả
      </Checkbox>
      <hr />
      <div>
        <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
      </div>
    </div>
  )
}

function getWidth(list) {
  let total = 0
  for (const item of list) {
    total += item.width
  }
  if (total <= window.innerWidth - 270) {
    total = undefined
  }
  return total
}

export default function MyTable(props) {
  const [newColumns, setNewColumns] = useState(props.columns)
  const __scroll = useRef(getWidth(props.columns))
  function onChange(list) {
    // console.log({ list })
    const _newList = []
    for (const item of list) {
      _newList.push(props.columns[item])
    }
    __scroll.current = getWidth(_newList)
    setNewColumns(_newList)
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      <div className="flex justify-end px-2 mb-2">
        <Space>
          <Popover
            placement="bottomRight"
            title={<div className="font-semibold">Cài đặt trường</div>}
            content={<Dropdown columns={props.columns} onChangeList={onChange} />}
            trigger="click"
          >
            <div className="setting_icon">
              <SettingOutlined />
            </div>
          </Popover>
        </Space>
      </div>

      <Table {...props} columns={newColumns} scroll={{ x: __scroll.current }} />
    </Fragment>
  )
}
