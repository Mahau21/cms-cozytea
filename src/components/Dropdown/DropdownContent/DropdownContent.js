import { useState, useEffect, forwardRef, useRef } from "react"
// import { apiContentTV } from "api"
import { Select, Spin } from "antd"
import { apiContent } from "api"

const Dropdown = forwardRef(({ onChange, value, contentType }, ref) => {
  const [options, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const __time = useRef()

  const fetch = async (search) => {
    setLoading(true)
    setRows([])
    let _rows = []
    try {
      const { data } = await apiContent.search({ search, config_type: contentType, page_size: 20 })
      _rows = data.map(({ id, name, link }) => {
        return { value: id, label: name, link }
      })
    } catch (e) {
      console.log(e)
    } finally {
      setRows(_rows)
      setLoading(false)
    }
  }

  function onChangeSearch(value) {
    if (__time.current) {
      clearTimeout(__time.current)
    }
    __time.current = setTimeout(() => {
      fetch(value)
    }, [400])
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType])

  useEffect(() => {
    fetch(undefined, value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <Select
      showSearch
      loading={loading}
      ref={ref}
      className="w-full"
      placeholder="Chọn nội dung..."
      allowClear
      onClear={onChangeSearch}
      filterOption={false}
      value={value}
      notFoundContent={loading ? <Spin size="small" /> : "Không tìm thấy"}
      options={options}
      onChange={onChange}
      onSearch={onChangeSearch}
    />
  )
})

export default Dropdown
