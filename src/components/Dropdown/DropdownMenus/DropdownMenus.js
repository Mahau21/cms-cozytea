import React, { useEffect, forwardRef, useState } from "react"
import { TreeSelect } from "antd"
import { apiMenu } from "api"

const listToTree = (list) => {
  let map = {}
  let node
  let roots = []

  for (let i = 0; i < list.length; i += 1) {
    map[list[i].id] = i
    list[i].children = []
  }

  for (let i = 0; i < list.length; i += 1) {
    node = list[i]
    node.title = list[i].name
    node.value = list[i].id
    if (node.parentId !== 0) {
      list[map[node.parentId]].children.push(node)
    } else {
      roots.push(node)
    }
  }
  return roots
}

const Dropdown = forwardRef(({ onChange, value }, ref) => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    async function fetch() {
      try {
        const { items } = await apiMenu.gets({ pageSize: 10000 })
        const data = listToTree(items)
        setRows(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TreeSelect
      ref={ref}
      value={value}
      treeData={rows}
      className="w-full"
      treeCheckable={true}
      showCheckedStrategy={TreeSelect.SHOW_PARENT}
      placeholder="Lựa chọn menu"
      onChange={onChange}
    />
  )
})

export default Dropdown
