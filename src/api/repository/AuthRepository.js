import Client from "../client/Client"

function register(data) {
  return Client.post(`/authentications/login/`, data)
}
function login(data) {
  return Client.post(`/authentications/login/`, data)
}
function getMenus() {
  return Client.get(`menus`)
}
function getMe() {
  return Client.get(`/account/information/`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  getMenus,
  getMe
}
