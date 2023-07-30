import React, { useEffect, forwardRef, useState } from "react"
import { Select } from "antd"
import { apiPermission } from "api"

const Dropdown = forwardRef(({ onChange, value }, ref) => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    async function fetch() {
      try {
        const { items } = await apiPermission.gets({ pageSize: 1000 })
        setRows(
          items.map(({ id, name }) => {
            return { label: name, value: id }
          })
        )
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function filterOption(input, option) {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  return (
    <Select
      ref={ref}
      value={value}
      filterOption={filterOption}
      className="w-full"
      showSearch
      allowClear
      mode="multiple"
      placeholder="Quyền hạn..."
      options={rows}
      onChange={onChange}
    />
  )
})

export default Dropdown
