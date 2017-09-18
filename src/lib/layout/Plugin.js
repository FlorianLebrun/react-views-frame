import { WindowClass } from "./Window"

type ParameterLink = {
  window: WindowClass,
  param: string,
}

export class PluginClass {
  name: string
  instance: PluginInstance
  parameters: Object
  component: Function<PluginInstance> // constructor of PluginInstance
  windows: { [WindowClassID]: WindowClass } = {}
  links: { [string]: Array<ParameterLink> } = {}
  export: Object
  import: Object
  context: PluginContext

  constructor(desc: Object, parameters: Object, context: PluginContext) {
    desc && Object.keys(desc).forEach(key => this[key] = desc[key])
    this.context = context
    this.parameters = parameters
    this.component = this.component || PluginInstance
    desc.windows && Object.keys(desc.windows).forEach(name => {
      this.windows[name] = new WindowClass(name, desc.windows[name], this)
    })
  }
  createInstance(): PluginInstance {
    return new (this.component)(this)
  }
  mountInstance(instance: PluginInstance, context: PluginContext) {
    this.instance = instance

    // Process import
    this.import && Object.keys(this.import).forEach(name => {
      const ref = this.import[name]
      const plugin = context.plugins[name]
      const pluginExport = plugin.pluginClass.export
      if (pluginExport) {
        if (ref === true) {
          pluginExport.forEach(key => {
            instance[key] = plugin[key]
          })
        }
        else if (typeof ref === "string") {
          instance[ref] = plugin
        }
      }
      else if (typeof ref === "string") {
        instance[ref] = plugin
      }
    })

    // Process windows parameters import
    Object.keys(this.windows).forEach(key => {
      const window = this.windows[key]
      window.parameters && Object.keys(window.parameters).forEach(param => {
        this.addParameterLink(window, param)
      })
    })

    instance.pluginWillMount(this.parameters)
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

export class PluginInstance {
  pluginClass: PluginClass
  application: Object

  // Life Cycle management functions
  pluginWillMount(parameters: Object) { } // eslint-disable-line
  pluginDidMount() { }
  pluginWillUnmount() { }

  constructor(pluginClass: PluginClass) {
    this.pluginClass = pluginClass
    this.application = pluginClass.context.application
  }
  openWindow(windowName: string, options) {
    this.layout.openPluginWindow(this.pluginClass.windows[windowName], this, options)
  }
  closeAllWindow() {
    console.log("closeAllWindow NOT IMPLEMENTED")
  }
  updateNextState = () => {
    if (this.nextState) {
      const updatedWindows = []
      Object.keys(this.nextState).forEach(key => {
        const value = this.nextState[key]
        const links = this.pluginClass.links[key]
        this[key] = value
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