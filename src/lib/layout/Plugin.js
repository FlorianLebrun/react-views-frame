import { WindowClass } from "./Window"
import Listenable from "../modules/listenable"


export class PluginClass {
  name: string
  instance: PluginInstance
  component: Function
  parameters: Object
  windows: { [string]: WindowClass }
  export: Object
  import: Object
  context: PluginContext
  users: Array<PluginClass>
  dependencies: Array<PluginClass>
  isMounted: boolean

  constructor(name: string, context: PluginContext) {
    this.name = name
    this.context = context
  }
  setup(desc: Object, parameters: Object) {
    this.parameters = parameters
    this.component = desc.component || PluginInstance

    // Setup dependencies
    if (desc.dependencies) {
      desc.dependencies.forEach(name => {
        return this.addDependency(name)
      })
    }

    // Setup windows
    if (desc.windows) {
      Object.keys(desc.windows).forEach(name => {
        if (!this.windows) this.windows = {}
        this.windows[name] = new WindowClass(name, desc.windows[name], this)
      })
      this.addDependency("windows-frame")
    }
  }
  addUser(user: PluginClass) {
    if (!this.users) this.users = []
    this.users.push(user)
    return this
  }
  addDependency(name: string) {
    const pluginClass = this.context.mapPlugin(name)
    if (!this.dependencies) this.dependencies = []

    const deps = this.dependencies
    for (let i = 0; i < deps.length; i++) {
      if (deps[i] === pluginClass) return
    }
    deps.push(pluginClass)
    return pluginClass.addUser(this)
  }
  mount() {
    if (!this.instance) {
      // Create instance
      this.instance = new (this.component)(this)
      this.context.plugins[this.name] = this.instance

      // Call will mount
      this.instance.pluginWillMount(this.parameters)

      // Notify all user plugins
      this.users && this.users.forEach(x => x.promptMount(this))
      this.promptMount()
    }
  }
  promptMount() {
    if (this.instance && !this.isMounted) {
      const deps = this.dependencies
      if (deps) {
        for (let i = 0; i < deps.length; i++) {
          if (!deps[i].instance) return
        }
      }
      this.didMount()
    }
  }
  didMount() {
    if (this.instance && !this.isMounted) {

      // Process import
      this.import && Object.keys(this.import).forEach(name => {
        const ref = this.import[name]
        const plugin = this.context.plugins[name]
        const pluginExport = plugin[".class"].export
        if (pluginExport) {
          if (ref === true) {
            pluginExport.forEach(key => {
              this.instance[key] = plugin[key]
            })
          }
          else if (typeof ref === "string") {
            this.instance[ref] = plugin
          }
        }
        else if (typeof ref === "string") {
          this.instance[ref] = plugin
        }
      })

      // Process windows parameters import
      this.windows && Object.keys(this.windows).forEach(key => {
        const window = this.windows[key]
        window.parameters && Object.keys(window.parameters).forEach(key => {
          const reference = window.parameters[key]
          const { pluginName, path } = this.resolveValueReference(reference, key)
          if (pluginName) window.addLink(pluginName, key, path)
          else console.error("Parameter '" + key + "' of window '" + window.name + "' has invalid link:", path)
        })
      })

      this.instance.pluginDidMount({})
      this.isMounted = true
    }
  }
  resolveValueReference(reference: string, key: string) {
    let pluginName, path
    if (reference === true) {
      pluginName = this.name
      path = key
    }
    else if (typeof reference === "string") {
      const parts = reference.split("/")
      if (parts.length > 1) {
        const pluginClass = parts[0] ? this.context.pluginClasses[parts[0]] : this
        pluginName = pluginClass && pluginClass.name
        path = parts[1]
      }
      else {
        pluginName = this.name
        path = reference
      }
    }
    return { pluginName, path }
  }
}

export class PluginInstance extends Listenable {
  ".class": PluginClass

  // Life Cycle management functions
  pluginWillMount(parameters: Object) { } // eslint-disable-line
  pluginDidMount() { }
  pluginWillUnmount() { }

  constructor(pluginClass: PluginClass) {
    super()
    this[".class"] = pluginClass
    if (pluginClass.windows) {
      this.openWindow = function (windowName: string, options: Object) {
        this.layout.openPluginWindow(pluginClass.windows[windowName], this, options)
      }
      this.closeWindow = function (windowName: string) {
        this.layout.closePluginWindows(pluginClass.windows[windowName], this)
      }
      this.closeAllWindow = function () {
        this.layout.closePluginWindows(null, this)
      }
    }
  }
}
