import React, { useState, useEffect, useRef, memo } from "react"
import { apiBlock } from "api"
import { Input } from "antd"
import useComponentVisible from "components/ClickOutSide"
import { convertLink } from "lib/function"

const DropdownBlocks = memo(({ onChangeItems, items }) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  const [rows, setRows] = useState([])
  const __search = useRef()
  const __time = useRef()

  async function fetch() {
    let items = []
    let params = {
      page_size: 20,
      not_menu: true,
      search: __search.current || undefined
    }
    try {
      const { data } = await apiBlock.gets(params)
      items = data
    } catch (e) {
      console.log(e)
    } finally {
      setRows(items)
      // setLoading(false)
    }
  }

  function onChangeSearch(e) {
    __search.current = e.target.value
    if (__time.current) clearTimeout(__time.current)
    __time.current = setTimeout(() => {
      fetch()
    }, 500)
  }

  function onBlur() {
    setIsComponentVisible(true)
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="relative">
      <Input onClick={onBlur} onChange={onChangeSearch} placeholder="Nhập tiêu đề bài đăng..." />
      <div ref={ref}>
        {isComponentVisible && (
          <div className="absolute top-10 bg-white shadow_antd left-0 w-full z-20 p-2 space-y-2 max-h-[350px] overflow-auto">
            {rows.length > 0 ? (
              rows.map(({ name, id, icon }) => {
                const __class = items?.find((i) => i.id === id) ? "bg-gray-100" : ""
                return (
                  <div
                    className={`p-2 text-base items-center border flex gap-2 rounded hover:bg-slate-200 ${__class}`}
                    key={id}
                    onClick={() => onChangeItems({ id, name })}
                  >
                    <img src={convertLink(icon)} className="w-10 h-10 rounded bg-gray-900" alt="" />{" "}
                    {name}
                  </div>
                )
              })
            ) : (
              <div className="text-base">No contents</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
})

export default DropdownBlocks
