/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra')
const path = require('path')

const SCHEMA_FOLDER = './schemas'
const API_FOLDER = './api'

const getAllSchemas = folder => {
  const dirs = fs.readdirSync(folder)

  return dirs.reduce((paths, v) => {
    const path = folder + '/' + v
    if (fs.statSync(path).isDirectory()) {
      return paths.concat(getAllSchemas(path))
    }

    return paths.concat(path)
  }, [])
}

const main = () => {
  const schemas = getAllSchemas(SCHEMA_FOLDER)

  schemas.forEach(v => {
    const targetPath = path.join(API_FOLDER, v)
    const schema = require(v)
    fs.outputFile(targetPath, JSON.stringify(schema, null, 2))
  })
}

main()
