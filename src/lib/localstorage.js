import CONSTANT from "./constains"

const expireDay = 7

function setLocalExpire(key, value, day) {
  const now = new Date()
  const item = {
    value: JSON.stringify(value),
    expiry: now.getTime() + day * 86400000
  }
  localStorage.setItem(key, JSON.stringify(item))
}

function getLocalExpire(key) {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) return null
  const item = JSON.parse(itemStr)
  const now = new Date()
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key)
    return null
  }
  return item.value
}

export function setAuthLocal(auth) {
  setLocalExpire("auth", auth, expireDay)
}

export function getAuthLocal() {
  const auth = getLocalExpire("auth")
  if (auth) {
    return JSON.parse(auth)
  } else {
    return {}
  }
}

export function removeAuthLocal() {
  localStorage.clear()
}

export function setConfig(type, data) {
  setLocalExpire(type, data, expireDay)
}

export function getConfig(type) {
  const data = getLocalExpire(type)
  if (data) {
    return JSON.parse(data)
  } else {
    return []
  }
}

export function getContentTypeId(type) {
  return getConfig(CONSTANT.CONFIG_TYPE).find((i) => i.key === type)?.value
}
