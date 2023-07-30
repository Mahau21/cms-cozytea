import React from "react"
import { Input } from "antd"
import { numberToCurrency } from "components/func"

const InputNumber = ({ value, onChange }) => {
  function onChangeCurrency(e) {
    const _preice = e.target.value.replace(/\./g, "")
    if (Number(_preice) || _preice === "") {
      onChange(_preice)
    }
  }

  return (
    <Input
      value={numberToCurrency(value)}
      onChange={onChangeCurrency}
      placeholder="Nhập số tiền..."
      addonAfter="vnd"
      style={{ width: 300 }}
    />
  )
}

export default InputNumber
