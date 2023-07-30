import React, { useRef } from "react"
import { Input, Select } from "antd"
const { Option } = Select
export default function Filter({ onFilter, filter }) {
  const __filter = useRef({})
  const __timeOut = useRef()

  function onChangeFilter(key, value) {
    __filter.current[key] = value
    if (__timeOut.current) {
      clearTimeout(__timeOut.current)
    }
    __timeOut.current = setTimeout(() => {
      onFilter(__filter.current)
    }, 500)
  }
  const { name } = filter
  return (
    <div className="flex justify-end gap-4">
      <Input
        defaultValue={name}
        placeholder="Tên product..."
        onChange={(e) => onChangeFilter("name", e.target.value)}
      />

      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={(e) => onChangeFilter("name", e.target.value)}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
    </div>
  )
}
