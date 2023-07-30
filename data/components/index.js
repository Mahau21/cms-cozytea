function renderIndex(name) {
  return `export { default } from "./${name}"\r\n`
}

module.exports = renderIndex
