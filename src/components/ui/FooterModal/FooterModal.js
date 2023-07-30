import { Button } from "antd"
import { forwardRef } from "react"

const FooterModal = forwardRef(
  ({ onClose, loading, cancelText = "Cancel", okText = "Ok" }, ref) => {
    return (
      <div className="footer_modal">
        <Button onClick={() => onClose(false)}>{cancelText}</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {okText}
        </Button>
      </div>
    )
  }
)
export default FooterModal
