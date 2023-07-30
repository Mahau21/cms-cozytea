import { Tag } from "antd"
import CONSTANT from "lib/constains"

export default function TagType({ type, name }) {
  function getColor() {
    let color = ""
    switch (type) {
      case CONSTANT.CONFIG_TYPE:
        color = "purple"
        break
      case CONSTANT.CONFIG_AGE:
        color = "geekblue"
        break
      case CONSTANT.CONFIG_MENU:
        color = "blue"
        break
      case CONSTANT.CONFIG_CATEGORY:
        color = "green"
        break
      default:
        break
    }
    return color
  }
  return name && <Tag color={getColor(type)}>{name}</Tag>
}
