const index = require("./components/index")
const component = require("./components/component")
const repository = require("./components/repository")
const filter = require("./components/filter")
const columns = require("./components/columns")
const drawer = require("./components/drawer")

const templates = {
  index,
  component,
  repository,
  columns,
  filter,
  drawer
}

module.exports = {
  ...templates
}
