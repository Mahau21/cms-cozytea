import React, { forwardRef } from "react"
import { Select } from "antd"

import useConfigGlobal from "components/hooks/useConfigGlobal"

const DropdownTopic = forwardRef(({ onChange, value, ...rest }, ref) => {
  const { categories } = useConfigGlobal()

  function filterOption(input, option) {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  return (
    <Select
      ref={ref}
      {...rest}
      value={value}
      showSearch
      mode="multiple"
      allowClear
      filterOption={filterOption}
      placeholder="Chọn thể loại..."
      onChange={onChange}
      options={categories}
    />
  )
})

export default DropdownTopic
