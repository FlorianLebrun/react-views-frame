import { WindowClass } from "./Window"

type ParameterLink = {
  window: WindowClass,
  param: string,
}

const PluginStatus = {
  Mapped: { desc: "mapped but not installed" },
  Installed: { desc: "instancied and will mount" },
  Mounted: { desc: "instancied and will mount" },
}

export class PluginClass {
  name: string
  status: Object
  instance: PluginComponent
  component: Function
  parameters: Object
  windows: { [WindowClassID]: WindowClass } = {}
  links: { [string]: Array<ParameterLink> } = {}
  export: Object
  import: Object
  context: PluginContext
  users: Array<PluginClass>
  dependencies: Array<PluginClass>

  constructor(name: string, context: PluginContext) {
    this.name = name
    this.status = PluginStatus.Mapped
    this.context = context
  }
  setup(desc: Object, parameters: Object) {
    this.parameters = parameters
    this.component = desc.component || PluginComponent

    // Setup dependencies
    if (desc.dependencies) {
      desc.dependencies.forEach(name => {
        return this.addDependency(name)
      })
    }

    // Setup windows
    if (desc.windows) {
      Object.keys(desc.windows).forEach(name => {
        this.windows[name] = new WindowClass(name, desc.windows[name], this)
      })
      this.addDependency("windows-frame")
    }

    // Mount an instance
    this.willMount()

    // Prompt for did mount procedure
    this.promptMount()
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
  promptMount() {
    if (this.status === PluginStatus.Installed) {
      const deps = this.dependencies
      if (deps) {
        for (let i = 0; i < deps.length; i++) {
          if (!deps[i].instance) return
        }
      }
      this.didMount()
    }
  }
  willMount() {
    this.status = PluginStatus.Installed

    // Create instance
    this.instance = new (this.component)(this)
    this.context.plugins[this.name] = this.instance

    // Call will mount
    this.instance.pluginWillMount(this.parameters)

    // Notify all user plugins
    this.users && this.users.forEach(x => x.promptMount(this))
  }
  didMount() {
    this.status = PluginStatus.Mounted

    // Process import
    this.import && Object.keys(this.import).forEach(name => {
      const ref = this.import[name]
      const plugin = this.context.plugins[name]
      const pluginExport = plugin.pluginClass.export
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
    Object.keys(this.windows).forEach(key => {
      const window = this.windows[key]
      window.parameters && Object.keys(window.parameters).forEach(param => {
        this.addParameterLink(window, param)
      })
    })

    this.instance.pluginDidMount()
  }
  addParameterLink(window: Object, param: string) {
    const link = this.resolveValueReference(window.parameters[param], param)
    if (link) {
      link.param = param
      link.window = window
      window.addLink(link)
      const linkList = this.links[link.path]
      if (!linkList) this.links[link.path] = [ link ]
      else linkList.push(link)
    }
    else {
      console.error("Parameter '" + param + "' of window '" + window.name + "' has invalid link:", link.path)
    }
  }
  resolveValueReference(reference: string, key: string) {
    if (reference === true) {
      return {
        pluginClass: this,
        path: key,
      }
    }
    else if (typeof reference === "string") {
      const parts = reference.split("/")
      if (parts.length > 1) {
        return {
          pluginClass: parts[0] ? this.context.pluginClasses[parts[0]] : this,
          path: parts[1],
        }
      }
      else return {
        pluginClass: this,
        path: reference,
      }
    }
  }
}

export class PluginComponent {
  pluginClass: PluginClass
  application: Object
  storage: Object
  nextState: Object

  // Life Cycle management functions
  pluginWillMount(parameters: Object) { } // eslint-disable-line
  pluginDidMount() { }
  pluginWillUnmount() { }

  constructor(pluginClass: PluginClass) {
    this.pluginClass = pluginClass
    this.application = pluginClass.context.application
    this.restorePluginStorage()
  }
  restorePluginStorage() {
    try {
      const data = localStorage.getItem(this.pluginClass.name)
      this.storage = data ? JSON.parse(data) : {}
    }
    catch (e) {
      this.storage = {}
      localStorage.removeItem(this.pluginClass.name)
      console.error("plugin storage cannot be load", e)
    }
  }
  savePluginStorage(storage: Object) {
    try {
      const data = JSON.stringify(storage)
      localStorage.setItem(this.pluginClass.name, data)
    }
    catch (e) {
      console.error("plugin storage cannot be save", e)
    }
  }
  openWindow(windowName: string, options: Object) {
    this.layout.openPluginWindow(this.pluginClass.windows[windowName], this, options)
  }
  closeWindow(windowName: string) {
    this.layout.closePluginWindows(this.pluginClass.windows[windowName], this)
  }
  closeAllWindow() {
    this.layout.closePluginWindows(null, this)
  }
  updateNextState = () => {
    if (this.nextState) {
      const updatedWindows = []
      Object.keys(this.nextState).forEach(key => {
        const value = this.nextState[key]
        const links = this.pluginClass.links[key]
        this[key] = value
        if (key === "storage") {
          this.savePluginStorage(value)
        }
        if (links) {
          const windows = this.layout.windows
          Object.keys(windows).forEach(wndId => {
            const wnd = windows[wndId]
            const wlink = links.find(lk => lk.window === wnd.windowClass)
            if (wlink) {
              wnd.parameters[wlink.param] = value
              if (updatedWindows.indexOf(wnd) < 0) updatedWindows.push(wnd)
            }
          })
        }
      })
      updatedWindows.forEach(wnd => wnd.render())
      this.nextState = null
    }
  }
  setState(state: Object) {
    const oldState = this.nextState
    const newState = oldState || {}
    Object.keys(state).forEach(key => {
      newState[key] = state[key]
      this[key] = state[key]
    })
    this.nextState = newState
    if (!oldState) setTimeout(this.updateNextState, 0)
  }
}