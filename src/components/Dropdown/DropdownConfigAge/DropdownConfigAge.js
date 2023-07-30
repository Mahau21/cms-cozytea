import React, { forwardRef } from "react"
import { Select } from "antd"
import useConfigGlobal from "components/hooks/useConfigGlobal"

function filterOption(input, option) {
  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const DropdownRole = forwardRef(({ onChange, value, ...rest }, ref) => {
  const { configAges } = useConfigGlobal()

  return (
    <Select
      ref={ref}
      {...rest}
      value={value}
      filterOption={filterOption}
      placeholder="Chọn độ tuổi..."
      onChange={onChange}
      options={configAges}
    />
  )
})

export default DropdownRole
