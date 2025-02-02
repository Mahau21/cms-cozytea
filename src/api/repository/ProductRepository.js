import Client from "../client/Client"
const resource = "product_sale"

function gets(params) {
  return Client.get(`${resource}`, { params })
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

const api = {
  gets,
  create,
  update,
  remove
}
export default api
