import React, { useEffect, useState } from "react"
import { Select } from "antd"
import { apiPromotion } from "api"

const Dropdown = ({ onChange, value, siteRegionId }) => {
  const [rows, setRows] = useState([])

  async function fetch() {
    try {
      const res = await apiPromotion.check({ pageSize: 1000, siteRegionId })
      setRows(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (siteRegionId) {
      fetch()
    } else {
      setRows([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteRegionId])

  return (
    <Select
      value={value}
      className="w-60"
      showSearch
      allowClear
      placeholder="Mã giảm giá..."
      onChange={onChange}
    >
      {rows?.length > 0 &&
        rows.map(({ code, name, discountPercent, id }) => {
          return (
            <Select.Option value={id} key={id}>
              <div className="flex justify-between">
                <div>{name}</div>
                <div>
                  <span className="text-blue-500">[{code}]</span>&nbsp;
                  <span className="text-green-500">[{discountPercent}%]</span>
                </div>
              </div>
            </Select.Option>
          )
        })}
    </Select>
  )
}

export default Dropdown
