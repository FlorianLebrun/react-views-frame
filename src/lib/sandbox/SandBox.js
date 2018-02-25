/* eslint-disable no-eval */
import base64 from "base-64"
import Connector from "./Connector"

const compileScript = eval

const defaultImports = {
  "icon": require("./Icon.js"),
}

export class Export {
  __esModule = true
}

export class Module extends Export {
  ".sandbox": SandBox = null
  "$": Array<Export> = null
}

export class SandBox {
  name: string
  modules: { [string]: Object } = {}
  connector: Connector
  devMode: boolean

  constructor(name: string) {
    if (typeof name !== "string") throw new Error()
    this.name = name
    this.devMode = true
    this.connector = new Connector()
    this.imports(defaultImports)
  }
  reset() {
    this.modules = {}
  }
  require = (ref: string) => {
    const resolved = this.modules[ref]
    if (!resolved) new Error(`Require module '${ref}' is not found.`)
    return resolved
  }
  imports(cimports: Object) {
    for (const guid in cimports) {
      let cimport = cimports[guid]
      const cmodule = this.getModule(guid)
      if (cmodule.$ === null) {
        cmodule.$ = true
        if (!cimport.__esSandboxExport) {
          Object.assign(cmodule, cimport)
        }
        else {
          cimport.__esSandboxExport(cmodule, this)
        }
        if (cmodule.default === undefined) {
          cmodule.default = cmodule
        }
      }
      else console.error(guid, "is imported more than once.")
    }
  }
  getModulesRegister(): { [string]: Module } {
    return this.modules
  }
  getModule(guid: string): Module {
    let cmodule = this.modules[guid]
    if (!cmodule) {
      cmodule = new Module()
      cmodule[".sandbox"] = this
      if (this.devMode) {
        cmodule[".guid"] = guid
      }
      this.modules[guid] = cmodule
    }
    return cmodule
  }
  getModuleGuid(cmodule: Module): string {
    for (const guid in this.modules) {
      if (this.modules[guid] === cmodule) return guid
    }
  }
  installModule(cmodule: Module): Promise<Module> | undefined {
    if (!cmodule) throw new Error("module is undefined")
    if (cmodule.$ === null) {
      const guid = this.getModuleGuid(cmodule)
      return cmodule.$ = this.connector.fetchModule(guid)
        .then((data) => {
          installPack(this, data)
          return cmodule
        })
    }
    else if (cmodule.$ instanceof Promise) {
      return cmodule.$
    }
  }
}

function installPack(context: SandBox, data: PackObject) {
  for (const cmodule of data.modules) {
    installModule(context, cmodule)
  }
}

function installModule(context: SandBox, data: ModuleObject): Object {
  const objectsCount = data.objects ? data.objects.length : 0

  // Create object export register
  const cmodule = context.getModule(data.name)
  if (data.type) cmodule[".type"] = data.type
  const register = [cmodule]
  for (let i = 1; i < objectsCount; i++) {
    register.push({})
  }
  cmodule.$ = register

  function installJs(obj: BasicObject, cexports: Object) {
    let code = obj.data

    // Append source map
    if (obj.mappings && obj.names && obj.source) {
      code += "\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,"
      code += base64.encode(JSON.stringify({
        version: 3,
        sources: [obj.location],
        sourceRoot: "/" + context.name + "/" + data.name,
        sourcesContent: [obj.source],
        mappings: obj.mappings,
        names: obj.names,
      }))
    }

    // Eval & call module constructor
    const constructor = compileScript(code)
    try {
      if (constructor instanceof Function) {
        constructor(cmodule, cexports, context.require)
      }
    }
    catch (e) {
      console.error(`in ${data.name} (${obj.location}) : `, e, constructor)
    }
    return cexports
  }
  function installCss(obj: BasicObject) {
    const head = document.getElementsByTagName("head")[0]
    const style = document.createElement("style")
    style.setAttribute("type", "text/css")
    if (style.styleSheet) { // IE
      style.styleSheet.cssText = obj.data
    }
    else { // the world
      style.appendChild(document.createTextNode(obj.data))
    }
    head.appendChild(style)
  }
  function installImage(obj: BasicObject, cexports: Object) {
    cexports.default = obj.data
  }

  // Install each object
  for (let i = 0; i < objectsCount; i++) {
    const obj = data.objects[i]
    const cexports = register[obj.id]
    try {
      switch (obj.type) {
        case "js":
          installJs(obj, cexports)
          break
        case "css":
          installCss(obj, cexports)
          break
        case "image":
          installImage(obj, cexports)
          break
        default:
          throw new Error(`unkwnow '${obj.type}'`)
      }
    }
    catch (e) {
      cmodule.__error = e.toString()
      console.error(`in ${data.name} (${obj.location}) : `, e, obj, obj.data)
      return cmodule
    }
  }
  return cmodule
}
