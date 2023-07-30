import { Skeleton } from "antd"

export default function SuspenseComponent() {
  return (
    <div className="wapper_small">
      <Skeleton.Button active shape="round" size="large" style={{ width: 200 }} className="mb-2" />
      <Skeleton active paragraph={{ rows: 12 }} />
    </div>
  )
}
