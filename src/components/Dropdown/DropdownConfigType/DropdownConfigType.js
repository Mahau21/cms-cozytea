import React, { forwardRef } from "react"
import { Select } from "antd"
import useConfigGlobal from "components/hooks/useConfigGlobal"

function filterOption(input, option) {
  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const DropdownRole = forwardRef(({ onChange, isSlide = false, value, ...rest }, ref) => {
  const { configTypes } = useConfigGlobal()

  return (
    <Select
      ref={ref}
      {...rest}
      value={value}
      className="w-full"
      allowClear
      filterOption={filterOption}
      placeholder="Kiểu nội dung..."
      onChange={onChange}
      options={configTypes.filter((i) => i.is_slide === isSlide)}
    />
  )
})

export default DropdownRole
