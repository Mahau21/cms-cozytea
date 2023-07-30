import { Tag } from "antd"
import CONSTANT from "lib/constains"

export default function TagLiveStatus({ status }) {
  function getColor() {
    let color = "",
      text = ""
    switch (status) {
      case CONSTANT.NOT_STARTED:
        color = "gold"
        text = "Sắp diễn ra	"
        break
      case CONSTANT.LIVE:
        color = "red"
        text = "Đang diễn ra"
        break
      case CONSTANT.FINISHED:
        color = ""
        text = "Đã kết thúc"
        break
      default:
        break
    }
    return [color, text]
  }
  const [color, text] = getColor()
  return <Tag color={color}>{text}</Tag>
}
