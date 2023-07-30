import { forwardRef } from "react"
import { Select } from "antd"

const { Option } = Select

const DropdownSize = forwardRef(({ onChange, value }, ref) => {
  return (
    <Select
      ref={ref}
      showSearch
      value={value}
      placeholder="Chọn size..."
      onChange={onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {sizes.map((item, k) => {
        return (
          <Option value={item} key={k}>
            {item}
          </Option>
        )
      })}
    </Select>
  )
})

export default DropdownSize
const sizes = ["L", "XL", "XXL"]
