/* eslint-disable no-eval */
import base64 from "base-64"
import Connector from "./Connector"

const compileScript = eval

const defaultImports = {
  "icon": require("./Icon.js"),
}

export class Module {
  ".sandbox": SandBox = null
  ".nref": string = 1
  ".dependencies": Array<string> = undefined
  "$": Array<Export> = null
}

export class SandBox {
  name: string
  modules: { [string]: Object } = {}
  connector: Connector

  constructor(name: string) {
    if (typeof name !== "string") throw new Error()
    this.name = name
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
      const module = this.getModule(guid)
      if (module.$ === null) {
        module.$ = true
        if (!cimport.__esSandboxExport) {
          Object.assign(module, cimport)
        }
        else {
          cimport.__esSandboxExport(module, this)
        }
        if (module.default === undefined) {
          module.default = module
        }
      }
      else console.error(guid, "is imported more than once.")
    }
  }
  getModulesRegister(): { [string]: Module } {
    return this.modules
  }
  getModule(guid: string): Module {
    let module = this.modules[guid]
    if (!module) {
      module = new Module()
      module[".sandbox"] = this
      this.modules[guid] = module
    }
    return module
  }
  getModuleGuid(module: Module): string {
    for (const guid in this.modules) {
      if (this.modules[guid] === module) return guid
    }
  }
  installModule(module: Module): Promise<Module> | undefined {
    if (!module) throw new Error("module is undefined")
    if (module.$ === null) {
      const guid = this.getModuleGuid(module)
      return module.$ = this.connector.fetchModule(guid)
        .then((data) => {
          installPack(this, data)
          return module
        })
    }
    else if (module.$ instanceof Promise) {
      return module.$
    }
  }
  uninstallModule(module: Module) {
    if (!module) throw new Error("module is undefined")
    if (module[".nref"] !== undefined) {
      module[".nref"]--
      if (!module[".nref"]) {
        const guid = this.getModuleGuid(module)
        if (guid) {
          const deps = module[".dependencies"]
          if (deps) {
            for (const key in deps) {
              this.closeFile(key)
            }
          }
          delete this.modules[guid]
        }
        else {
          throw new Error("module is unknown")
        }
      }
    }
    else {
      throw new Error("module is cannot be uninstalled")
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
  const register = [cmodule]
  for (let i = 1; i < objectsCount; i++) {
    register.push({})
  }
  cmodule.$ = register

  function installJs(obj: BasicObject, cexports: Object) {
    let code = obj.data

    // Append source map
    if (obj.mappings && obj.source) {
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
    try {
      const constructor = compileScript(code)
      constructor(cmodule, cexports, context.require)
    }
    catch (e) {
      console.error(`in ${data.name} (${obj.location}) : `, e, code)
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
    cexports.uri = obj.data
    cexports.default = cexports
  }

  // Install each object
  for (let i = objectsCount - 1; i >= 0; i--) {
    const obj = data.objects[i]
    const cexports = register[i]
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
      console.error(`in ${data.name} (${obj.location}) : `, e)
    }
  }
  return cmodule
}
