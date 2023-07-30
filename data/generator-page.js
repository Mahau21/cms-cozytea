// const chokidar = require("chokidar")
const fs = require("fs")
const pa = require("path")
const templates = require("./templates")
console.log({ templates })

const fileExists = (path) => (file) => fs.existsSync(`${path}/${file}`)

const writeToPath = (path, name) => (file, content) => {
  const filePath = `${path}/${name}/${file}`

  fs.writeFile(filePath, content, (err) => {
    if (err) throw err
    console.log("Created file: ", filePath)
    return true
  })
}

function changeRepository(path, name) {
  const outPutRepository = pa.join(path, `../api/index.js`)
  fs.readFile(outPutRepository, "utf8", function (err, data) {
    if (err) {
      return console.log(err)
    }
    const result =
      data + `export { default as api${name} } from "./repository/${name}Repository"\r\n`
    fs.writeFile(outPutRepository, result, "utf8", function (err) {
      if (err) return console.log(err)
    })
  })
}

function changePageLists(path, name) {
  const outPutRepository = pa.join(path, `../components/router/PageList.js`)
  fs.readFile(outPutRepository, "utf8", function (err, data) {
    if (err) {
      return console.log(err)
    }
    const newDatas = data.split("//____ListPage")
    const __string = newDatas[1].split("} //next_component")
    const strintObj = `},
    {
      path: "${name.toLowerCase()}",
      Element: ${name},
      code: "${name.toUpperCase()}_CONTROLLER"
    } //next_component`
    const listObjs = __string[0] + strintObj + __string[1]

    const result =
      newDatas[0] +
      `const ${name} = lazy(() => import("pages/${name}"))\r\n` +
      "//____ListPage" +
      listObjs

    fs.writeFile(outPutRepository, result, "utf8", function (err) {
      if (err) return console.log(err)
    })
  })
}

const writeToPathApi = (path, name) => (file, content) => {
  const filePath = `${pa.join(path, `../api/repository`)}/${file}`
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      throw err
    } else {
      changeRepository(path, name)
      changePageLists(path, name)
    }
    console.log("Created file: ", filePath)
    return true
  })
}

function createFiles(path, name) {
  const files = {
    index: "index.js",
    component: `${name}.js`,
    columns: "Columns.js",
    filter: "Filter.js",
    drawer: "DrawerUpdate.js",
    repository: `${name}Repository.js`
  }

  if (name !== "pages") {
    console.log("name", name)
    const writeFile = writeToPath(path, name)
    const writeFileApi = writeToPathApi(path, name)

    const toFileMissingBool = (file) => !fileExists(path)(file)
    const checkAllMissing = (acc, cur) => acc && cur

    const noneExist = Object.values(files).map(toFileMissingBool).reduce(checkAllMissing)
    if (noneExist) {
      const __folder = pa.join(__path, name)
      fs.access(__folder, (error) => {
        if (error) {
          fs.mkdir(__folder, { recursive: true }, (error) => {
            if (error) {
              console.log(error)
            } else {
              console.log("New Directory created successfully !!")
              console.log(`Detected new component: ${name}, ${path}`)
              Object.entries(files).forEach(([type, fileName]) => {
                if (type === "repository") {
                  writeFileApi(fileName, templates[type](name))
                } else {
                  writeFile(fileName, templates[type](name))
                }
              })
            }
          })
        } else {
          console.log("Given Directory already exists !!")
        }
      })
    } else {
      console.log("component exist!")
    }
  }
}

const pageName = "Tag"
const __path = pa.join(__dirname, `../src/pages`)
createFiles(__path, pageName)
