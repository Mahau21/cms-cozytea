import { Table } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import "./index.scss"

function getWidth(list) {
  let total = 0
  for (const item of list) {
    if (item.width) total += item.width
    if (item.minWidth) total += item.minWidth
  }
  return total
}

export default function MyTable({
  columns,
  x,
  y,
  notScrollY = false,
  rowKey,
  yHead = 340,
  ...rest
}) {
  const [scroll, setScroll] = useState()

  useEffect(() => {
    const scrollY = window.innerHeight - yHead
    const __scroll = { x: getWidth(columns), y: notScrollY ? undefined : y || scrollY }
    setScroll(__scroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Table
      size="small"
      bordered
      rowKey={(r) => (rowKey ? r[rowKey] : r.id)}
      pagination={false}
      scroll={scroll}
      columns={columns}
      {...rest}
    />
  )
}
