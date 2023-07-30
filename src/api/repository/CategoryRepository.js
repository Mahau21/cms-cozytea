import Client from "../client/Client"
const resource = "/category"

function gets(params) {
  return Client.get(`${resource}`, { params })
}
function get(id) {
  return Client.get(`${resource}/${id}`)
}
function create(data) {
  return Client.post(`${resource}`, data)
}
function update(id, data) {
  return Client.put(`${resource}/${id}`, data)
}
function remove(id) {
  return Client.delete(`${resource}/${id}`)
}
function updateOrder(data) {
  return Client.put(`${resource}/reorder`, data)
}

const api = {
  gets,
  get,
  create,
  update,
  remove,
  updateOrder
}
export default api
