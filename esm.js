const Module = require("module")
const { Script } = require("vm")

const {
  createCachedData,
  runInNewContext,
} = Script.prototype

const { readFileSync } = require("fs")

const esmModule = new Module(module.id)

esmModule.filename = module.filename
esmModule.parent = module.parent

function readFile(filename, options) {
  try {
    return readFileSync(filename, options)
  } catch (e) {}

  return null
}

const cachePath = `${__dirname}/node_modules/.cache/esm`
const cachedData = readFile(`${cachePath}/.data.blob`) ?? undefined
const content = readFile(`${__dirname}/esm/loader.js`, "utf8")
const scriptOptions = {
  __proto__: null,
  cachedData,
  filename: module.filename,
  produceCachedData: typeof createCachedData !== "function"
}

const script = new Script(
  "const __global__ = this;" +
  "(function (require, module, __shared__) { " +
  content +
  "\n});",
  scriptOptions
)

const compiledESM = Reflect.apply(runInNewContext, script, [{
  __proto__: null,
  global: globalThis
}, {
  __proto__: null,
  filename: module.filename,
}])

// Declare `shared` before assignment to avoid the TDZ.
let shared

compiledESM(require, esmModule, shared)
shared = esmModule.exports

const { dir } = shared.package
dir.set(cachePath, {})
