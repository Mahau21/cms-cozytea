import React, { useRef } from "react"
import { Input } from "antd"

export default function Filter({ onFilter, filter }) {
  const __filter = useRef({})
  const __timeOut = useRef()

  function onChangeFilter(key, value) {
    __filter.current[key] = value
    if (__timeOut.current) {
      clearTimeout(__timeOut.current)
    }
    __timeOut.current = setTimeout(() => {
      onFilter(__filter.current)
    }, 500)
  }
  const { name } = filter
  return (
    <div className="flex justify-end gap-4">
      <Input
        defaultValue={name}
        placeholder="Tên region..."
        onChange={(e) => onChangeFilter("name", e.target.value)}
      />
    </div>
  )
}
