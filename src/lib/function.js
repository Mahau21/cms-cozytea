import moment from "moment-timezone"
import queryString from "query-string"

export function converDataTree(_list, filter) {
  let list = [..._list]
  function loop(__list) {
    for (let i = 0; i < __list.length; i++) {
      __list[i].value = __list[i].id
      __list[i].title = __list[i].name

      if (__list[i].children && __list[i].children.length > 0) {
        if (filter) {
          __list[i].selectable = true
        } else {
          __list[i].selectable = false
        }
        loop(__list[i].children)
      }
    }
  }
  loop(list)
  return list
}

export const paramsUrl = {
  get: () => {
    return queryString.parse(window.location.search)
  },
  set: (params) => {
    const currentUrlParams = queryString.stringify(params, {
      skipNull: true
    })
    window.history.replaceState(
      {},
      null,
      `${window.location.pathname}?${currentUrlParams.toString()}`
    )
  }
}

export function getRole() {
  const role = localStorage.getItem("role")
  return role || false
}

export function fomatCurrency(number) {
  if (number) {
    return parseInt(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  }
  return 0
}

export function getToken() {
  return localStorage.getItem("accessToken")
}

export function convertLink(url) {
  if (url?.includes("http")) return url
  return "https://oed-static.onsports.vn:8443/image-upload/" + url
}

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
