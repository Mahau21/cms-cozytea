import moment from "moment"

export function numberToCurrency(text) {
  if (text)
    return Math.floor(text)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  return ""
}

export function selectedDate() {
  return {
    "Tháng trước": [
      moment().subtract(1, "months").startOf("month"),
      moment().subtract(1, "months").endOf("month")
    ],
    "Tháng này": [moment().startOf("month"), moment().endOf("month")],
    "Tuần trước": [
      moment().subtract(1, "weeks").startOf("week"),
      moment().subtract(1, "weeks").endOf("week")
    ],
    "Tuần này": [moment().startOf("week"), moment().endOf("week")],
    "Hôm trước": [moment().subtract(1, "days"), moment()],
    "Hôm nay": [moment(), moment()]
  }
}
