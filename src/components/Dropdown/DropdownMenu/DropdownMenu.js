import React, { useEffect, forwardRef, useState } from "react"
import { Select } from "antd"
import { apiMenu } from "api"
import { getConfig, setConfig } from "lib/localstorage"
import CONSTANT from "lib/constains"

function filterOption(input, option) {
  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const DropdownRole = forwardRef(({ onChange, value, ...rest }, ref) => {
  const [rows, setRows] = useState([])

  async function fetch() {
    try {
      const { data } = await apiMenu.gets()
      const newItems = data.map(({ id, name }) => {
        return { label: name, value: id }
      })
      setRows(newItems)
      setConfig(CONSTANT.CONFIG_MENU, newItems)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const configs = getConfig(CONSTANT.CONFIG_MENU)
    if (configs.length > 0) {
      setRows(configs)
    } else {
      fetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Select
      ref={ref}
      {...rest}
      value={value}
      allowClear
      filterOption={filterOption}
      placeholder="Chọn menu..."
      onChange={onChange}
      options={rows}
    />
  )
})

export default DropdownRole
